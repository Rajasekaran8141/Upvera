import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User, BookOpen, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCandidateById, createCandidate, updateCandidate } from '../../services/api';

const COURSES = [
  'Java',
  'Python',
  'MERN Stack',
  'ReactJS',
  'Angular',
  'Flutter',
  'Kotlin',
  'AI / ML',
  'Salesforce',
  'MuleSoft',
  'C',
  'C++',
  'Desktop Support',
  'Network Support',
  'Linux',
  'AWS',
  'Wintel',
  'AutoCAD',
  'CATIA',
];

const EMPTY = {
  full_name:    '',
  email:        '',
  college:      '',
  department:   '',
  course_name:  '',
  program_type: 'Course',
  start_date:   '',
  end_date:     '',
  issue_date:   '',
};

export default function AddEditCandidate() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const isEdit     = Boolean(id);

  const [form,    setForm]    = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving,  setSaving]  = useState(false);
  const [errors,  setErrors]  = useState({});

  useEffect(() => {
    if (!isEdit) return;
    getCandidateById(id)
      .then(data => {
        const fmt = d => d ? d.split('T')[0] : '';
        setForm({
          full_name:    data.full_name    || '',
          email:        data.email        || '',
          college:      data.college      || '',
          department:   data.department   || '',
          course_name:  data.course_name  || '',
          program_type: data.program_type || 'Course',
          start_date:   fmt(data.start_date),
          end_date:     fmt(data.end_date),
          issue_date:   fmt(data.issue_date),
        });
      })
      .catch(() => { toast.error('Failed to load candidate'); navigate(-1); })
      .finally(() => setLoading(false));
  }, [id, isEdit, navigate]);

  const set = key => e => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(er => ({ ...er, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim())   e.full_name   = 'Name is required';
    if (!form.email.trim())       e.email       = 'Email is required';
    if (!form.course_name.trim()) e.course_name = 'Course is required';
    if (!form.start_date)         e.start_date  = 'Start date required';
    if (!form.end_date)           e.end_date    = 'End date required';
    if (!form.issue_date)         e.issue_date  = 'Issue date required';
    if (form.start_date && form.end_date && form.end_date < form.start_date)
      e.end_date = 'End date must be after start date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (isEdit) {
        await updateCandidate(id, form);
        toast.success('Candidate updated successfully');
      } else {
        await createCandidate(form);
        toast.success('Candidate added successfully');
      }
      navigate('/admin/candidates');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="btn border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 p-2.5">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {isEdit ? 'Edit Candidate' : 'Add New Candidate'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {isEdit ? 'Update candidate information' : 'Register a new candidate in the system'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Info */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
              <User size={15} className="text-sky-600" />
            </div>
            <h2 className="font-bold text-slate-800">Personal Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="label">Full Name *</label>
              <input className={`input ${errors.full_name ? 'input-error' : ''}`}
                placeholder="e.g. Arun Kumar" value={form.full_name} onChange={set('full_name')} />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
            </div>
            <div>
              <label className="label">Email Address *</label>
              <input className={`input ${errors.email ? 'input-error' : ''}`}
                type="email" placeholder="arun@email.com" value={form.email} onChange={set('email')} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label">College / Institution</label>
              <input className="input" placeholder="e.g. Anna University"
                value={form.college} onChange={set('college')} />
            </div>
            <div>
              <label className="label">Department</label>
              <input className="input" placeholder="e.g. Computer Science"
                value={form.department} onChange={set('department')} />
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BookOpen size={15} className="text-emerald-600" />
            </div>
            <h2 className="font-bold text-slate-800">Course Details</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="label">Course Name *</label>
              <select className={`input ${errors.course_name ? 'input-error' : ''}`}
                value={form.course_name} onChange={set('course_name')}>
                <option value="">Select a course</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="Other">Other</option>
              </select>
              {errors.course_name && <p className="text-red-500 text-xs mt-1">{errors.course_name}</p>}
            </div>
            <div>
              <label className="label">Program Type *</label>
              <div className="flex gap-3 mt-1">
                {['Course', 'Internship'].map(t => (
                  <label key={t} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold ${
                    form.program_type === t
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}>
                    <input type="radio" className="sr-only" value={t}
                      checked={form.program_type === t} onChange={set('program_type')} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
              <Calendar size={15} className="text-violet-600" />
            </div>
            <h2 className="font-bold text-slate-800">Dates</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="label">Start Date *</label>
              <input className={`input ${errors.start_date ? 'input-error' : ''}`}
                type="date" value={form.start_date} onChange={set('start_date')} />
              {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
            </div>
            <div>
              <label className="label">End Date *</label>
              <input className={`input ${errors.end_date ? 'input-error' : ''}`}
                type="date" value={form.end_date} onChange={set('end_date')} min={form.start_date} />
              {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
            </div>
            <div>
              <label className="label">Issue Date *</label>
              <input className={`input ${errors.issue_date ? 'input-error' : ''}`}
                type="date" value={form.issue_date} onChange={set('issue_date')} />
              {errors.issue_date && <p className="text-red-500 text-xs mt-1">{errors.issue_date}</p>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate(-1)}
            className="btn-outline flex-1 justify-center py-3">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
            {saving
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Save size={16} />
            }
            {saving ? 'Saving…' : isEdit ? 'Update Candidate' : 'Add Candidate'}
          </button>
        </div>
      </form>
    </div>
  );
}
