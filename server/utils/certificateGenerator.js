const PDFDocument = require('pdfkit');
const QRCode      = require('qrcode');
const path        = require('path');
const fs          = require('fs');

const LOGO_PATH   = path.join(__dirname, '../public/assets/logo.jpg');
const CERTS_DIR   = path.join(__dirname, '../public/certificates');
const QR_DIR      = path.join(__dirname, '../public/qrcodes');

const PRIMARY     = '#1e3a8a';
const SECONDARY   = '#0ea5e9';
const ACCENT      = '#06b6d4';
const LIGHT_BLUE  = '#dbeafe';
const TEXT_DARK   = '#0f172a';
const TEXT_MID    = '#334155';
const TEXT_LIGHT  = '#64748b';

const W = 841.89;   // A4 landscape width  (pt)
const H = 595.28;   // A4 landscape height (pt)

function formatDate(d) {
  if (!d) return '';
  const date = parseCalendarDate(d);
  if (!date) return String(d);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

function parseCalendarDate(d) {
  if (!d) return null;
  if (d instanceof Date) {
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  }
  const match = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    const parsed = new Date(d);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

function calcDuration(start, end) {
  const s = parseCalendarDate(start), e = parseCalendarDate(end);
  if (!s || !e) return '';
  const days = Math.floor(Math.abs(e - s) / 86400000) + 1;
  if (days < 30) return `${days} Day${days !== 1 ? 's' : ''}`;
  const months = Math.floor(days / 30);
  const rem    = days % 30;
  const ml     = `${months} Month${months !== 1 ? 's' : ''}`;
  return rem ? `${ml} ${rem} Day${rem !== 1 ? 's' : ''}` : ml;
}

async function generateQrPng(url, outPath) {
  await QRCode.toFile(outPath, url, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 1,
    color: { dark: PRIMARY, light: '#FFFFFF' },
    width: 300,
  });
}

function drawDecorativeCorner(doc, x, y, flip) {
  const size = 28;
  const sx   = flip ? -1 : 1;
  const sy   = flip ? -1 : 1;

  doc.save()
     .translate(x, y)
     .moveTo(0, 0).lineTo(size * sx, 0).lineWidth(2.5).strokeColor(SECONDARY).stroke()
     .moveTo(0, 0).lineTo(0, size * sy).lineWidth(2.5).strokeColor(SECONDARY).stroke()
     .restore();
}

function generateCertificatePdf(candidate, certData) {
  return new Promise((resolve, reject) => {
    try {
      const {
        full_name, college, department, course_name,
        program_type, start_date, end_date, issue_date,
      } = candidate;
      const { certificate_number, verification_url } = certData;

      [CERTS_DIR, QR_DIR].forEach(d => fs.mkdirSync(d, { recursive: true }));

      const pdfFile = path.join(CERTS_DIR, `${certificate_number}.pdf`);
      const qrFile  = path.join(QR_DIR,   `${certificate_number}.png`);

      // Generate QR then PDF
      generateQrPng(verification_url, qrFile).then(() => {
        const doc = new PDFDocument({
          layout: 'landscape', size: 'A4',
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          info: {
            Title:   `${course_name} Certificate – ${full_name}`,
            Author:  'Upvera Technology',
            Subject: 'Training / Internship Certificate',
          },
        });

        const chunks = [];
        doc.on('data', c => chunks.push(c));
        doc.on('end', () => {
          fs.writeFileSync(pdfFile, Buffer.concat(chunks));
          resolve({
            pdfPath: `certificates/${certificate_number}.pdf`,
            qrPath:  `qrcodes/${certificate_number}.png`,
          });
        });
        doc.on('error', reject);

        // ── Background ──────────────────────────────────────────────────────
        doc.rect(0, 0, W, H).fill('#f0f6ff');

        // Subtle diagonal stripes background
        doc.save().opacity(0.04);
        for (let i = -H; i < W + H; i += 22) {
          doc.moveTo(i, 0).lineTo(i + H, H).lineWidth(6).strokeColor(PRIMARY).stroke();
        }
        doc.restore();

        // ── Outer border ────────────────────────────────────────────────────
        doc.rect(14, 14, W - 28, H - 28).lineWidth(3).strokeColor(PRIMARY).stroke();
        doc.rect(20, 20, W - 40, H - 40).lineWidth(1).strokeColor(SECONDARY).stroke();

        // ── Header band ─────────────────────────────────────────────────────
        doc.rect(14, 14, W - 28, 108).fill(PRIMARY);

        // Header accent strip
        doc.rect(14, 122, W - 28, 4).fill(SECONDARY);

        // ── Logo ─────────────────────────────────────────────────────────────
        const logoExists = fs.existsSync(LOGO_PATH);
        if (logoExists) {
          doc.image(LOGO_PATH, 36, 24, { width: 82, height: 82 });
        }

        // ── Org name + subtitle ──────────────────────────────────────────────
        const orgX = logoExists ? 132 : 36;
        doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(26)
           .text('UPVERA TECHNOLOGY', orgX, 36, { width: W - orgX - 36 });
        doc.fillColor('#93c5fd').font('Helvetica').fontSize(11)
           .text('Empowering Careers Through Quality IT Training & Placement Services', orgX, 70, { width: W - orgX - 36 });
        doc.fillColor('#bfdbfe').font('Helvetica').fontSize(9)
           .text('Chennai | Theni  •  contact@upveratech.com  •  +91 8667874698', orgX, 90, { width: W - orgX - 36 });

        // ── Certificate type title ───────────────────────────────────────────
        const certTitle = program_type === 'Internship'
          ? 'CERTIFICATE OF INTERNSHIP'
          : 'CERTIFICATE OF COMPLETION';
        doc.fillColor(PRIMARY).font('Helvetica-Bold').fontSize(21)
           .text(certTitle, 0, 142, { align: 'center', width: W, characterSpacing: 3 });

        // ── Decorative divider ───────────────────────────────────────────────
        const divY = 175;
        doc.moveTo(90, divY).lineTo(W / 2 - 50, divY).lineWidth(1.5).strokeColor(SECONDARY).stroke();
        doc.circle(W / 2, divY, 7).fill(PRIMARY);
        doc.circle(W / 2, divY, 4).fill(SECONDARY);
        doc.moveTo(W / 2 + 50, divY).lineTo(W - 90, divY).lineWidth(1.5).strokeColor(SECONDARY).stroke();

        // ── "This is to certify that" ────────────────────────────────────────
        doc.fillColor(TEXT_LIGHT).font('Helvetica').fontSize(11)
           .text('THIS IS TO CERTIFY THAT', 0, 192, { align: 'center', width: W, characterSpacing: 2 });

        // ── Candidate name ────────────────────────────────────────────────────
        const nameSize = full_name.length > 28 ? 32 : 38;
        doc.fillColor(TEXT_DARK).font('Helvetica-Bold').fontSize(nameSize)
           .text(full_name.toUpperCase(), 80, 210, { align: 'center', width: W - 160 });

        // Name underline
        const nameLen = Math.min(full_name.length * 18, 380);
        const nameUx  = (W - nameLen) / 2;
        doc.moveTo(nameUx, 265).lineTo(nameUx + nameLen, 265).lineWidth(2.5).strokeColor(SECONDARY).stroke();

        // ── Completion statement ──────────────────────────────────────────────
        const stmt = program_type === 'Internship'
          ? `has successfully completed the ${program_type} program in`
          : 'has successfully completed the course in';
        doc.fillColor(TEXT_MID).font('Helvetica').fontSize(13)
           .text(stmt, 0, 278, { align: 'center', width: W });

        // ── Course name ───────────────────────────────────────────────────────
        doc.fillColor(SECONDARY).font('Helvetica-Bold').fontSize(19)
           .text(`"${course_name}"`, 80, 302, { align: 'center', width: W - 160 });

        // ── Duration ──────────────────────────────────────────────────────────
        const duration = calcDuration(start_date, end_date);
        doc.fillColor(TEXT_MID).font('Helvetica').fontSize(11)
           .text(
             `${formatDate(start_date)}  –  ${formatDate(end_date)}   (${duration})`,
             0, 336, { align: 'center', width: W }
           );

        // ── College / Department ──────────────────────────────────────────────
        if (college) {
          const affil = department ? `${college}  |  ${department}` : college;
          doc.fillColor(TEXT_LIGHT).font('Helvetica-Oblique').fontSize(10)
             .text(affil, 0, 356, { align: 'center', width: W });
        }

        // ── Horizontal rule before footer ─────────────────────────────────────
        const ruleY = 388;
        doc.moveTo(36, ruleY).lineTo(W - 36, ruleY).lineWidth(0.75).strokeColor('#94a3b8').stroke();

        // ── Left: Signature block ─────────────────────────────────────────────
        doc.fillColor(TEXT_LIGHT).font('Helvetica').fontSize(9)
           .text('Authorised by', 50, ruleY + 12);
        doc.fillColor(TEXT_DARK).font('Helvetica-Bold').fontSize(11)
           .text('Upvera Technology', 50, ruleY + 24);
        doc.moveTo(50, ruleY + 48).lineTo(210, ruleY + 48).lineWidth(1).strokeColor('#94a3b8').stroke();
        doc.fillColor(TEXT_LIGHT).font('Helvetica').fontSize(9)
           .text('Authorised Signatory', 50, ruleY + 52);

        // ── Centre: Certificate details ───────────────────────────────────────
        doc.fillColor(TEXT_LIGHT).font('Helvetica').fontSize(9)
           .text('Certificate Number', 0, ruleY + 12, { align: 'center', width: W });
        doc.fillColor(PRIMARY).font('Helvetica-Bold').fontSize(13)
           .text(certificate_number, 0, ruleY + 24, { align: 'center', width: W, characterSpacing: 1 });
        doc.fillColor(TEXT_LIGHT).font('Helvetica').fontSize(9)
           .text(`Issued on:  ${formatDate(issue_date)}`, 0, ruleY + 44, { align: 'center', width: W });
        doc.fillColor(ACCENT).font('Helvetica').fontSize(8)
           .text('Scan QR code to verify this certificate online', 0, ruleY + 58, { align: 'center', width: W });

        // ── Right: QR code ───────────────────────────────────────────────────
        const qrExists = fs.existsSync(qrFile);
        if (qrExists) {
          const qrSize = 110;
          const qrX    = W - qrSize - 50;
          const qrY    = ruleY + 4;
          // QR border
          doc.rect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8).fill('#ffffff').stroke();
          doc.image(qrFile, qrX, qrY, { width: qrSize, height: qrSize });
          doc.fillColor(TEXT_LIGHT).font('Helvetica').fontSize(7)
             .text('Verify Certificate', qrX - 4, qrY + qrSize + 8, { width: qrSize + 8, align: 'center' });
        }

        // ── Corner decorations ────────────────────────────────────────────────
        drawDecorativeCorner(doc, 28, 28,   false);   // top-left
        drawDecorativeCorner(doc, W - 28, 28,   true);  // top-right  (flip x)
        drawDecorativeCorner(doc, 28, H - 28, false);   // bottom-left (flip y handled separately)
        drawDecorativeCorner(doc, W - 28, H - 28, true); // bottom-right

        doc.end();
      }).catch(reject);

    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateCertificatePdf };
