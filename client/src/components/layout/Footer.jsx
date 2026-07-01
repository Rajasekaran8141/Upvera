import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, BadgeCheck } from 'lucide-react';

const QUICK = [
  { to: '/',             label: 'Home' },
  { to: '/about',        label: 'About Us' },
  { to: '/training',     label: 'Training Programs' },
  { to: '/placement',    label: 'Placement Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact',      label: 'Contact Us' },
];

const PROGRAMS = [
  'IT Software Development',
  'IT Support Training',
  'Linux Administration',
  'Windows Server Admin',
  'AWS Cloud Training',
];

const SOCIALS = [
  { label: 'Facebook',  href: '#', text: 'f' },
  { label: 'Instagram', href: '#', text: 'ig' },
  { label: 'LinkedIn',  href: '#', text: 'in' },
  { label: 'X / Twitter', href: '#', text: 'X' },
  { label: 'YouTube',   href: '#', text: '▶' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <img src="/logo.jpg" alt="Upvera Technology" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your gateway to IT excellence and career success. Empowering careers through quality IT training and placement services.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ href, label, text }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 flex items-center justify-center
                              text-slate-400 hover:text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5">
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm hover:text-primary-400 hover:translate-x-1 inline-block transition-all duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Programs</h4>
            <ul className="space-y-2.5">
              {PROGRAMS.map(p => (
                <li key={p}>
                  <Link to="/training"
                    className="text-sm hover:text-primary-400 hover:translate-x-1 inline-block transition-all duration-150">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Get in Touch</h4>
            <ul className="space-y-4 mb-6">
              <li>
                <a href="mailto:contact@upveratech.com"
                   className="flex items-start gap-3 text-sm hover:text-primary-400 transition-colors">
                  <Mail size={15} className="mt-0.5 shrink-0 text-primary-500" />
                  contact@upveratech.com
                </a>
              </li>
              <li>
                <a href="tel:+918667874698"
                   className="flex items-start gap-3 text-sm hover:text-primary-400 transition-colors">
                  <Phone size={15} className="mt-0.5 shrink-0 text-primary-500" />
                  +91 8667874698
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary-500" />
                <span>Chennai | Theni, Tamil Nadu</span>
              </li>
            </ul>

            <div className="bg-slate-800 rounded-xl p-4 text-xs space-y-1.5">
              <p className="text-white font-semibold mb-2">Office Hours</p>
              <p>Mon – Fri: 9:00 AM – 7:00 PM</p>
              <p>Saturday: 9:00 AM – 5:00 PM</p>
              <p>Sunday: 10:00 AM – 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
                        flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Upvera Technology. All rights reserved.</p>
          <Link to="/verify"
            className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 font-medium transition-colors">
            <BadgeCheck size={13} /> Verify a Certificate
          </Link>
        </div>
      </div>
    </footer>
  );
}
