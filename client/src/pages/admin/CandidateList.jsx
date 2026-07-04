import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Plus, Edit2, Trash2, Award, ChevronLeft,
  ChevronRight, Users, RefreshCw, Download,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getCandidates, deleteCandidate,
  generateCertificate, downloadCertificate,
} from '../../services/api';
import { formatCalendarDate } from '../../utils/date';

const PAGE_SIZE = 10;

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [total,      setTotal]      = useState(0);
  const [page,       setPage]       = useState(1);
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(true);
  const [genId,      setGenId]      = useState(null);
  const [dlId,       setDlId]       = useState(null);
  const [delId,      setDelId]      = useState(null);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCandidates({ page, limit: PAGE_SIZE, search });
      setCandidates(data.candidates || []);
      setTotal(data.total || 0);
    } catch {
      toast.error('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = e => { setSearch(e.target.value); setPage(1); };

  const handleDelete = async id => {
    if (!window.confirm('Delete this candidate? This cannot be undone.')) return;
    setDelId(id);
    try {
      await deleteCandidate(id);
      toast.success('Candidate deleted');
      load();
    } catch { toast.error('Delete failed'); }
    finally { setDelId(null); }
  };

  const handleGenerate = async candidate => {
    setGenId(candidate.id);
    try {
      const res = await generateCertificate(candidate.id);
      toast.success(`Certificate ${res.certificate_number} generated!`);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Generation failed');
    } finally { setGenId(null); }
  };

  const handleDownload = async certNum => {
    setDlId(certNum);
    try {
      const blob = await downloadCertificate(certNum);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${certNum}.pdf`;
      a.click(); URL.revokeObjectURL(url);
    } catch { toast.error('Download failed'); }
    finally { setDlId(null); }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Candidates</h1>
          <p className="text-slate-500 text-sm mt-0.5">{total} total candidates registered</p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="btn border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 px-4 py-2.5 text-sm">
            <RefreshCw size={15} /> Refresh
          </button>
          <Link to="new" className="btn-primary text-sm px-5 py-2.5">
            <Plus size={15} /> Add Candidate
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Total',       val: total,      color: 'bg-sky-50    text-sky-600'    },
          { label: 'With Certs',  val: candidates.filter(c => c.certificate_number).length, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Courses',     val: candidates.filter(c => c.program_type === 'Course').length,     color: 'bg-violet-50 text-violet-600' },
          { label: 'Internships', val: candidates.filter(c => c.program_type === 'Internship').length, color: 'bg-amber-50  text-amber-600'  },
        ].map(({ label, val, color }) => (
          <div key={label} className="card p-4">
            <p className={`text-2xl font-extrabold ${color.split(' ')[1]}`}>{val}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="card p-4 mb-5">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-10"
            placeholder="Search by name, email, or course…"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table card */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : candidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Users size={28} className="text-slate-300" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">No candidates found</p>
            <p className="text-sm text-slate-400 mb-5">{search ? 'Try a different search term' : 'Add your first candidate to get started'}</p>
            {!search && <Link to="new" className="btn-primary text-sm px-5 py-2.5"><Plus size={15} /> Add Candidate</Link>}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Candidate', 'Course', 'Program', 'Duration', 'Certificate', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {candidates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600
                                          flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {c.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{c.full_name}</p>
                            <p className="text-xs text-slate-400">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-700 max-w-[160px] truncate">{c.course_name}</p>
                        {c.college && <p className="text-xs text-slate-400 truncate max-w-[160px]">{c.college}</p>}
                      </td>
                      <td className="px-5 py-4">
                        <span className={c.program_type === 'Course' ? 'badge-blue' : 'badge-green'}>
                          {c.program_type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                        <p>{formatCalendarDate(c.start_date, { month: 'short' })}</p>
                        <p>{formatCalendarDate(c.end_date, { month: 'short' })}</p>
                      </td>
                      <td className="px-5 py-4">
                        {c.certificate_number ? (
                          <div>
                            <p className="font-mono text-xs font-bold text-slate-700">{c.certificate_number}</p>
                            <span className={c.cert_status === 'Active' ? 'badge-green' : 'badge-red'}>
                              {c.cert_status || 'Active'}
                            </span>
                          </div>
                        ) : (
                          <span className="badge-slate">Not generated</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            to={`${c.id}/edit`}
                            className="btn border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 px-3 py-1.5 text-xs"
                          >
                            <Edit2 size={12} /> Edit
                          </Link>

                          {c.certificate_number ? (
                            <button
                              onClick={() => handleDownload(c.certificate_number)}
                              disabled={dlId === c.certificate_number}
                              className="btn border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 px-3 py-1.5 text-xs"
                            >
                              {dlId === c.certificate_number
                                ? <span className="w-3 h-3 border border-primary-400 border-t-transparent rounded-full animate-spin" />
                                : <Download size={12} />
                              }
                              PDF
                            </button>
                          ) : (
                            <button
                              onClick={() => handleGenerate(c)}
                              disabled={genId === c.id}
                              className="btn border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 text-xs"
                            >
                              {genId === c.id
                                ? <span className="w-3 h-3 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                : <Award size={12} />
                              }
                              Generate
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(c.id)}
                            disabled={delId === c.id}
                            className="btn border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 text-xs"
                          >
                            {delId === c.id
                              ? <span className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                              : <Trash2 size={12} />
                            }
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50">
                <p className="text-xs text-slate-500">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 px-3 py-2 text-xs disabled:opacity-40"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                    .map((n, i, arr) => (
                      <>
                        {i > 0 && arr[i - 1] !== n - 1 && <span key={`dots-${n}`} className="px-2 py-2 text-slate-400 text-xs">…</span>}
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={`btn px-3.5 py-2 text-xs border ${
                            n === page
                              ? 'bg-primary-500 border-primary-500 text-white'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {n}
                        </button>
                      </>
                    ))
                  }
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="btn border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 px-3 py-2 text-xs disabled:opacity-40"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
