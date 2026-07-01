const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(50, parseInt(req.query.limit) || 10);
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();

    const where  = search
      ? 'WHERE c.full_name LIKE ? OR c.email LIKE ? OR c.course_name LIKE ?'
      : '';
    const params = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];

    const [rows] = await pool.query(
      `SELECT c.*,
              cert.id               AS cert_id,
              cert.certificate_number,
              cert.status           AS cert_status,
              cert.pdf_path,
              cert.created_at       AS cert_generated_at
       FROM candidates c
       LEFT JOIN certificates cert ON c.id = cert.candidate_id
       ${where}
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM candidates c ${where}`,
      params
    );

    res.json({
      candidates: rows,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM candidates WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Candidate not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const {
      full_name, email, college, department,
      course_name, program_type, start_date, end_date, issue_date,
    } = req.body;

    if (!full_name || !email || !course_name || !program_type || !start_date || !end_date || !issue_date) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const [result] = await pool.query(
      `INSERT INTO candidates
         (full_name, email, college, department, course_name, program_type, start_date, end_date, issue_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [full_name, email, college || null, department || null, course_name, program_type, start_date, end_date, issue_date]
    );

    res.status(201).json({ id: result.insertId, message: 'Candidate added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const {
      full_name, email, college, department,
      course_name, program_type, start_date, end_date, issue_date,
    } = req.body;

    await pool.query(
      `UPDATE candidates
       SET full_name=?, email=?, college=?, department=?,
           course_name=?, program_type=?, start_date=?, end_date=?, issue_date=?
       WHERE id=?`,
      [full_name, email, college || null, department || null,
       course_name, program_type, start_date, end_date, issue_date, req.params.id]
    );

    res.json({ message: 'Candidate updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM candidates WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Candidate not found' });
    res.json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
