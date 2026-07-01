import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('uv_admin_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auto-logout on 401 (but not on the login endpoint itself)
api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401 && !err.config.url.includes('/admin/login')) {
      localStorage.removeItem('uv_admin_token');
      localStorage.removeItem('uv_admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// ── Admin ────────────────────────────────────────────────────────────────────
export const adminLogin = (username, password) =>
  api.post('/admin/login', { username, password }).then(r => r.data);

// ── Candidates ───────────────────────────────────────────────────────────────
export const getCandidates    = (params) => api.get('/candidates', { params }).then(r => r.data);
export const getCandidateById = (id)     => api.get(`/candidates/${id}`).then(r => r.data);
export const createCandidate  = (data)   => api.post('/candidates', data).then(r => r.data);
export const updateCandidate  = (id, d)  => api.put(`/candidates/${id}`, d).then(r => r.data);
export const deleteCandidate  = (id)     => api.delete(`/candidates/${id}`).then(r => r.data);

// ── Certificates ─────────────────────────────────────────────────────────────
export const generateCertificate = (candidateId) =>
  api.post(`/certificates/generate/${candidateId}`).then(r => r.data);

export const verifyCertificate = (certNumber) =>
  axios.get(`/api/certificates/verify/${certNumber}`).then(r => r.data);

export const downloadCertificate = (certNumber) =>
  api.get(`/certificates/download/${certNumber}`, { responseType: 'blob' }).then(r => r.data);

export const updateCertStatus = (certId, status) =>
  api.patch(`/certificates/status/${certId}`, { status }).then(r => r.data);

export default api;
