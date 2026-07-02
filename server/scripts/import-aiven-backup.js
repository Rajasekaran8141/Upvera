const fs = require('fs');
const path = require('path');
const readline = require('readline');
const mysql = require('mysql2/promise');

const backupPath = process.argv[2];

if (!backupPath) {
  console.error('Usage: node scripts/import-aiven-backup.js /path/to/backup.sql');
  process.exit(1);
}

function askHidden(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  return new Promise((resolve) => {
    const onData = (char) => {
      char = char.toString();
      if (char === '\n' || char === '\r' || char === '\u0004') {
        process.stdout.write('\n');
        process.stdin.off('data', onData);
      } else {
        readline.moveCursor(process.stdout, -1, 0);
        process.stdout.write('*');
      }
    };

    process.stdin.on('data', onData);
    rl.question(query, (value) => {
      rl.close();
      resolve(value);
    });
  });
}

async function main() {
  const sqlFile = path.resolve(backupPath);
  const sql = fs.readFileSync(sqlFile, 'utf8');
  const password = process.env.DB_PASSWORD || await askHidden('Aiven MySQL password: ');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'mysql-698ffd9-tr9111996-6ea9.j.aivencloud.com',
    port: Number(process.env.DB_PORT || 15411),
    user: process.env.DB_USER || 'avnadmin',
    password,
    database: process.env.DB_NAME || 'defaultdb',
    ssl: { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false' },
    multipleStatements: true,
  });

  try {
    await connection.query(sql);
    const [candidates] = await connection.query('SELECT COUNT(*) AS count FROM candidates');
    const [certificates] = await connection.query('SELECT COUNT(*) AS count FROM certificates');
    console.log(`Imported successfully. candidates=${candidates[0].count}, certificates=${certificates[0].count}`);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
