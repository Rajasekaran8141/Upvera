import { useState } from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  Users, PlusCircle, LayoutDashboard,
  LogOut, Menu, ShieldCheck, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CandidateList    from './CandidateList';
import AddEditCandidate from './AddEditCandidate';

const NAV = [
  { to: 'candidates',     label: 'Candidates',   icon: Users,         end: true },
  { to: 'candidates/new', label: 'Add Candidate', icon: PlusCircle },
];

export default function AdminLayout() {
  const [open,   setOpen]   = useState(false);
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login', { replace: true }); };

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? 'flex flex-col h-full' : 'hidden lg:flex flex-col'} w-64 bg-slate-900 text-white shrink-0 min-h-screen sticky top-0 self-start`}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <p className="font-extrabold text-white text-sm leading-none">Upvera Admin</p>
            <p className="text-slate-400 text-[11px] mt-0.5">{username}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-slate-400
                     hover:bg-red-900/40 hover:text-red-300 transition-all"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 items-stretch">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-64 h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 lg:hidden sticky top-0 z-30">
          <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary-500" />
            <span className="font-bold text-slate-800 text-sm">Upvera Admin</span>
          </div>
        </header>

        {/* Desktop top bar */}
        <header className="hidden lg:flex bg-white border-b border-slate-100 px-8 py-4 items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <LayoutDashboard size={15} />
            <ChevronRight size={13} />
            <span className="text-slate-700 font-medium">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-700 font-bold text-xs">{username?.charAt(0)?.toUpperCase()}</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">{username}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Routes>
            <Route index element={<Navigate to="candidates" replace />} />
            <Route path="candidates"       element={<CandidateList />} />
            <Route path="candidates/new"   element={<AddEditCandidate />} />
            <Route path="candidates/:id/edit" element={<AddEditCandidate />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
