import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, BadgeCheck } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',             label: 'Home',     end: true },
  { to: '/about',        label: 'About' },
  { to: '/placement',    label: 'Placement' },
  { to: '/training',     label: 'Training' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact',      label: 'Contact' },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/98 backdrop-blur-xl shadow-sm border-b border-slate-100'
        : 'bg-white border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <div className="h-12 overflow-hidden transition-all">
              <img src="/logo.jpeg" alt="Upvera Technology" className="h-full w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to} to={to} end={end}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/verify"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-primary-500 hover:text-primary-600 hover:bg-primary-50'
                }`
              }
            >
              <BadgeCheck size={14} />
              Verify
            </NavLink>
          </nav>

          {/* Right: Admin button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600
                         text-white text-sm font-semibold rounded-xl
                         transition-all shadow-blue hover:shadow-blue hover:-translate-y-0.5"
            >
              <ShieldCheck size={15} />
              Admin
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100
        ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/verify"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-50 text-primary-600' : 'text-primary-500 hover:bg-primary-50'
              }`
            }
          >
            <BadgeCheck size={15} /> Verify Certificate
          </NavLink>
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-xl mt-2"
          >
            <ShieldCheck size={15} /> Admin Panel
          </Link>
        </nav>
      </div>
    </header>
  );
}
