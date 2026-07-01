import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { adminLogin } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [form,    setForm]    = useState({ username: '', password: '' });
  const [show,    setShow]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const navigate  = useNavigate();
  const { login } = useAuth();

  const set = k => e => { setForm(f => ({ ...f, [k]: e.target.value })); setError(''); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.password) { setError('Both fields are required.'); return; }
    setLoading(true);
    try {
      const data = await adminLogin(form.username, form.password);
      login(data.token, data.username);
      navigate('/admin/candidates', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login — Upvera Technology</title>
      </Helmet>

      <div className="min-h-screen bg-section-alt flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-card ring-1 ring-slate-100 mb-4">
              <ShieldCheck size={30} className="text-primary-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Portal</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage Upvera Technology</p>
          </div>

          {/* Card */}
          <div className="card p-8">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                <AlertCircle size={17} className="text-red-500 shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Username</label>
                <input
                  className="input"
                  placeholder="admin"
                  autoComplete="username"
                  value={form.username}
                  onChange={set('username')}
                />
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    className="input pr-12"
                    type={show ? 'text' : 'password'}
                    placeholder="••••••••••"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={set('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center btn-lg mt-2"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <LogIn size={17} />
                }
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Upvera Technology · Admin Access Only
          </p>
        </div>
      </div>
    </>
  );
}
