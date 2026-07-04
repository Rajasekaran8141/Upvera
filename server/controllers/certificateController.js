const path   = require('path');
const fs     = require('fs');
const pool   = require('../config/db');
const { v4: uuidv4 }             = require('uuid');
const { generateCertificatePdf } = require('../utils/certificateGenerator');

async function nextCertNumber() {
  const year = new Date().getFullYear();
  const [[{ max_seq }]] = await pool.query(
    `SELECT MAX(CAST(SUBSTRING_INDEX(certificate_number, '-', -1) AS UNSIGNED)) AS max_seq
     FROM certificates
     WHERE certificate_number LIKE ?`,
    [`UV-${year}-%`]
  );
  return `UV-${year}-${String((max_seq || 0) + 1).padStart(6, '0')}`;
}

// POST /api/certificates/generate/:candidateId
const generate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const [existing] = await pool.query(
      'SELECT id FROM certificates WHERE candidate_id = ?', [candidateId]
    );
    if (existing.length) {
      return res.status(400).json({ message: 'Certificate already generated for this candidate' });
    }

    const [rows] = await pool.query('SELECT * FROM candidates WHERE id = ?', [candidateId]);
    if (!rows.length) return res.status(404).json({ message: 'Candidate not found' });
    const candidate = rows[0];

    const certificate_number = await nextCertNumber();
    const verification_token = uuidv4();
    const frontendUrl        = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verification_url   = `${frontendUrl}/verify/${certificate_number}`;

    const { pdfPath, qrPath } = await generateCertificatePdf(candidate, {
      certificate_number,
      verification_url,
    });

    await pool.query(
      `INSERT INTO certificates
         (candidate_id, certificate_number, verification_token, verification_url, qr_code_path, pdf_path, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, 'Active', 'admin')`,
      [candidateId, certificate_number, verification_token, verification_url, qrPath, pdfPath]
    );

    res.json({
      success: true,
      message: 'Certificate generated successfully',
      certificate_number,
      verification_url,
      download_url: `/api/certificates/download/${certificate_number}`,
    });
  } catch (err) {
    console.error('Certificate generation error:', err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/certificates/verify/:certNumber  (public)
const verify = async (req, res) => {
  try {
    const { certNumber } = req.params;

    const [rows] = await pool.query(
      `SELECT c.*, cert.certificate_number, cert.status AS cert_status,
              cert.created_at AS cert_created, cert.verification_url
       FROM certificates cert
       JOIN candidates c ON cert.candidate_id = c.id
       WHERE cert.certificate_number = ?`,
      [certNumber]
    );

    if (!rows.length) {
      return res.status(404).json({ valid: false, message: 'Certificate not found' });
    }

    const cert = rows[0];

    const certData = {
      full_name:          cert.full_name,
      email:              cert.email,
      college:            cert.college,
      department:         cert.department,
      course_name:        cert.course_name,
      program_type:       cert.program_type,
      start_date:         cert.start_date,
      end_date:           cert.end_date,
      issue_date:         cert.issue_date,
      certificate_number: cert.certificate_number,
      status:             cert.cert_status,
      organization:       'Upvera Technology',
      issued_at:          cert.cert_created,
    };

    res.json({
      valid:   cert.cert_status === 'Active',
      revoked: cert.cert_status === 'Revoked',
      data:    certData,
    });
  } catch (err) {
    res.status(500).json({ valid: false, message: err.message });
  }
};

// GET /api/certificates/download/:certNumber
const download = async (req, res) => {
  try {
    const { certNumber } = req.params;
    const filePath = path.join(__dirname, '../public/certificates', `${certNumber}.pdf`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Certificate PDF not found' });
    }
    res.download(filePath, `${certNumber}.pdf`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/certificates/status/:certId
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Revoked'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    await pool.query('UPDATE certificates SET status = ? WHERE id = ?', [status, req.params.certId]);
    res.json({ message: `Certificate ${status === 'Active' ? 'activated' : 'revoked'} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generate, verify, download, updateStatus };
