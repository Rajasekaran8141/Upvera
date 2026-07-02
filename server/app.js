const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));

app.get('/api/health', (_, res) =>
  res.json({ status: 'ok', message: 'Upvera Technology API running', timestamp: new Date() })
);

module.exports = app;
