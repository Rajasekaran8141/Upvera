import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BadgeCheck, Search, AlertCircle, Download,
  User, BookOpen, Calendar, Award, XCircle, QrCode,
} from 'lucide-react';
import { verifyCertificate, downloadCertificate } from '../services/api';

function Field({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-slate-500" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-semibold text-slate-800 text-sm">{value}</p>
      </div>
    </div>
  );
}

export default function Verify() {
  const { certNumber: paramCert } = useParams();
  const navigate = useNavigate();

  const [query,    setQuery]    = useState(paramCert || '');
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [dlLoading,setDlLoading]= useState(false);

  useEffect(() => {
    if (paramCert) handleVerify(paramCert);
  }, [paramCert]);

  const handleVerify = async (certNum) => {
    const num = (certNum || query).trim().toUpperCase();
    if (!num) { setError('Please enter a certificate number.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const response = await verifyCertificate(num);
      if (!response || !response.data) {
        setError('Certificate not found. Please check the number and try again.');
        return;
      }
      setResult(response.data);
      if (!paramCert) navigate(`/verify/${num}`, { replace: true });
    } catch {
      setError('Certificate not found. Please check the number and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fmtDate = d => {
    if (!d) return '—';
    const date = new Date(d);
    if (isNaN(date)) return d;
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const handleDownload = async () => {
    if (!result?.certificate_number) return;
    setDlLoading(true);
    try {
      const blob = await downloadCertificate(result.certificate_number);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${result.certificate_number}.pdf`;
      a.click(); URL.revokeObjectURL(url);
    } catch { /* silent */ }
    finally { setDlLoading(false); }
  };

  const isActive = result?.status === 'Active';

  return (
    <>
      <Helmet>
        <title>Verify Certificate — Upvera Technology</title>
        <meta name="description" content="Instantly verify the authenticity of any Upvera Technology training certificate using the certificate number." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 px-4 bg-hero-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative text-center">
          <span className="section-tag">Certificate Verification</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Verify Your <span className="text-gradient">Certificate</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
            Enter a certificate number or scan the QR code on the certificate to instantly verify its authenticity.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="max-w-2xl mx-auto px-4">

          {/* Search */}
          <div className="card p-8 mb-8">
            <label className="label text-center block mb-4">Enter Certificate Number</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <QrCode size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="input pl-11 uppercase font-mono tracking-widest"
                  placeholder="e.g. UV-2026-000001"
                  value={query}
                  onChange={e => { setQuery(e.target.value.toUpperCase()); setError(''); setResult(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleVerify()}
                />
              </div>
              <button
                onClick={() => handleVerify()}
                disabled={loading || !query.trim()}
                className="btn-primary px-6 py-3 shrink-0"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Search size={18} />
                }
                {loading ? 'Checking…' : 'Verify'}
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3">
              Certificate numbers follow the format: <span className="font-mono font-semibold text-slate-600">UV-YYYY-NNNNNN</span>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-200 rounded-2xl mb-6 animate-fade-in">
              <AlertCircle size={20} className="text-red-500 shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className={`card overflow-hidden animate-fade-up`}>
              {/* Status banner */}
              <div className={`px-8 py-5 flex items-center gap-4 ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`}>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  {isActive
                    ? <BadgeCheck size={26} className="text-white" />
                    : <XCircle     size={26} className="text-white" />
                  }
                </div>
                <div className="text-white">
                  <p className="font-extrabold text-lg leading-none">
                    {isActive ? 'Certificate Verified' : 'Certificate Revoked'}
                  </p>
                  <p className="text-sm opacity-80 mt-1">
                    {isActive ? 'This is an authentic Upvera Technology certificate.' : 'This certificate has been revoked.'}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Certificate Number</p>
                    <p className="font-mono font-bold text-slate-900 text-lg">{result.certificate_number}</p>
                  </div>
                  <span className={isActive ? 'badge-green' : 'badge-red'}>
                    {isActive ? '● Active' : '● Revoked'}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <Field label="Student Name"  value={result.full_name}    icon={User}     />
                  <Field label="Course"        value={result.course_name}  icon={BookOpen} />
                  <Field label="Program Type"  value={result.program_type} icon={Award}    />
                  <Field label="Issue Date"    value={fmtDate(result.issue_date)}  icon={Calendar} />
                  <Field label="Duration"      value={`${fmtDate(result.start_date)} → ${fmtDate(result.end_date)}`} icon={Calendar} />
                  {result.college &&
                    <Field label="Institution" value={result.college}       icon={Award}    />
                  }
                </div>

                {isActive && (
                  <button
                    onClick={handleDownload}
                    disabled={dlLoading}
                    className="btn-primary w-full justify-center"
                  >
                    {dlLoading
                      ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <Download size={16} />
                    }
                    {dlLoading ? 'Downloading…' : 'Download Certificate (PDF)'}
                  </button>
                )}
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <BadgeCheck size={13} className="text-primary-400" />
                Verified by Upvera Technology Certificate System · upveratech.com
              </div>
            </div>
          )}

          {/* Help text */}
          {!result && !error && !loading && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <BadgeCheck size={36} className="text-primary-400" />
              </div>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                Enter the certificate number found on your Upvera Technology training certificate to verify its authenticity instantly.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
