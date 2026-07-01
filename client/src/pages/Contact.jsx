import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const INFO = [
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 8667874698'],
    sub: 'Mon–Sat, 9 AM – 7 PM',
    color: 'bg-sky-50 text-sky-600',
    href: 'tel:+918667874698',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['contact@upveratech.com'],
    sub: 'We reply within 24 hours',
    color: 'bg-emerald-50 text-emerald-600',
    href: 'mailto:contact@upveratech.com',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Chennai Branch', 'Theni Branch'],
    sub: 'Both centres open 6 days',
    color: 'bg-violet-50 text-violet-600',
    href: null,
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon–Fri: 9 AM – 7 PM', 'Sat: 9 AM – 5 PM', 'Sun: 10 AM – 2 PM'],
    sub: 'Walk-ins welcome',
    color: 'bg-amber-50 text-amber-600',
    href: null,
  },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us — Upvera Technology</title>
        <meta name="description" content="Get in touch with Upvera Technology for IT training enrolment, career counselling, or any queries. Call or email us — Chennai & Theni, Tamil Nadu." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 px-4 bg-hero-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <span className="section-tag">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 max-w-2xl">
            We Would Love to <span className="text-gradient">Hear From You</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Whether you have a question about a course, want career advice, or are ready to enrol — reach out directly and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INFO.map(({ icon: Icon, title, lines, sub, color, href }) => {
            const inner = (
              <div className={`card p-6 h-full ${href ? 'hover:shadow-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={20} />
                </div>
                <p className="font-bold text-slate-900 mb-2">{title}</p>
                {lines.map(l => <p key={l} className="text-sm text-slate-700 font-medium">{l}</p>)}
                <p className="text-xs text-slate-400 mt-2">{sub}</p>
              </div>
            );
            return href
              ? <a key={title} href={href} className="block">{inner}</a>
              : <div key={title}>{inner}</div>;
          })}
        </div>
      </section>

      {/* Main CTA */}
      <section className="section bg-section-alt">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag">Contact Us</span>
            <h2 className="section-title">Reach Out Directly</h2>
            <p className="section-desc">
              The fastest way to connect with us is a call or email. We respond within hours.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {/* Call CTA */}
            <a
              href="tel:+918667874698"
              className="card p-8 flex flex-col items-center text-center gap-4
                         hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center
                              group-hover:bg-sky-500 transition-colors duration-300">
                <Phone size={28} className="text-sky-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-lg mb-1">Call Us Now</p>
                <p className="text-sky-600 font-bold text-xl">+91 8667874698</p>
                <p className="text-slate-400 text-sm mt-2">Mon–Sat · 9 AM – 7 PM</p>
              </div>
              <span className="btn-primary w-full justify-center mt-2">
                <Phone size={16} /> Tap to Call
              </span>
            </a>

            {/* Email CTA */}
            <a
              href="mailto:contact@upveratech.com"
              className="card p-8 flex flex-col items-center text-center gap-4
                         hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center
                              group-hover:bg-emerald-500 transition-colors duration-300">
                <Mail size={28} className="text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-lg mb-1">Email Us</p>
                <p className="text-emerald-600 font-bold text-base">contact@upveratech.com</p>
                <p className="text-slate-400 text-sm mt-2">We reply within 24 hours</p>
              </div>
              <span className="btn-outline w-full justify-center mt-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                <Mail size={16} /> Send an Email
              </span>
            </a>
          </div>

          {/* Location cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="https://www.google.com/maps/search/Upvera+Technology+Chennai+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center gap-4 hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0
                              group-hover:bg-violet-500 transition-colors duration-300">
                <MapPin size={22} className="text-violet-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Chennai Branch</p>
                <p className="text-sm text-slate-500">Tamil Nadu, India</p>
                <p className="text-xs text-violet-500 font-semibold mt-1">Open in Google Maps →</p>
              </div>
            </a>

            <a
              href="https://www.google.com/maps/search/Upvera+Technology+Theni+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center gap-4 hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0
                              group-hover:bg-violet-500 transition-colors duration-300">
                <MapPin size={22} className="text-violet-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Theni Branch</p>
                <p className="text-sm text-slate-500">Tamil Nadu, India</p>
                <p className="text-xs text-violet-500 font-semibold mt-1">Open in Google Maps →</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
