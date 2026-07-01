import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, CheckCircle2, Award, Users, Building2,
  GraduationCap, Briefcase, Star, Phone, ChevronRight,
  TrendingUp, Shield, Clock, HeartHandshake,
} from 'lucide-react';
import TechMarquee from '../components/layout/TechMarquee';

const STATS = [
  { value: 500,  suffix: '+', label: 'Students Trained',    icon: GraduationCap, color: 'text-sky-500' },
  { value: 95,   suffix: '%', label: 'Placement Rate',      icon: TrendingUp,    color: 'text-emerald-500' },
  { value: 50,   suffix: '+', label: 'Hiring Partners',     icon: Building2,     color: 'text-violet-500' },
  { value: 5,    suffix: '+', label: 'Years Experience',    icon: Award,         color: 'text-amber-500' },
];

const SERVICES = [
  {
    icon: GraduationCap,
    title: 'IT Training Programs',
    desc:  'Hands-on technical training in Software Development, Linux, AWS, Python, Java, and more — designed for real industry needs.',
    color: 'bg-sky-50 text-sky-600',
    link:  '/training',
  },
  {
    icon: Briefcase,
    title: 'Placement Assistance',
    desc:  'End-to-end placement support including resume building, mock interviews, and direct referrals to top IT companies.',
    color: 'bg-emerald-50 text-emerald-600',
    link:  '/placement',
  },
  {
    icon: Award,
    title: 'Certification',
    desc:  'Industry-recognized certificates with QR-based verification — showcasing your achievement to employers.',
    color: 'bg-violet-50 text-violet-600',
    link:  '/verify',
  },
  {
    icon: HeartHandshake,
    title: 'Career Mentoring',
    desc:  'One-on-one guidance from experienced IT professionals to help you navigate your career path effectively.',
    color: 'bg-amber-50 text-amber-600',
    link:  '/about',
  },
];

const WHY = [
  { icon: Shield,    title: 'Industry-Aligned Curriculum',  desc: 'Updated every semester based on current hiring trends' },
  { icon: Users,     title: 'Expert Trainers',              desc: 'Learn from professionals with 10+ years in IT industry' },
  { icon: Clock,     title: 'Flexible Batches',             desc: 'Morning, evening, and weekend batches to suit your schedule' },
  { icon: TrendingUp,title: 'Proven Track Record',          desc: 'Over 500 students placed in top companies since 2019' },
  { icon: CheckCircle2, title: 'Small Batch Size',          desc: 'Limited seats per batch for personalised attention' },
  { icon: HeartHandshake, title: 'Lifetime Support',        desc: 'Alumni network and job referrals even after course completion' },
];

function StatCounter({ value, suffix, label, icon: Icon, color }) {
  const ref    = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = value / 60;
      const timer = setInterval(() => {
        start = Math.min(start + step, value);
        if (el) el.textContent = Math.floor(start) + suffix;
        if (start >= value) clearInterval(timer);
      }, 25);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, suffix]);

  return (
    <div ref={ref} className="card p-6 text-center group hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${color.replace('text-', 'bg-').replace('500','100').replace('600','100')}`}>
        <Icon size={22} className={color} />
      </div>
      <p ref={numRef} className="text-3xl font-extrabold text-slate-900">0{suffix}</p>
      <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Upvera Technology — IT Training & Placement in Chennai & Theni</title>
        <meta name="description" content="Upvera Technology offers professional IT training and guaranteed placement assistance in Chennai and Theni. Learn Software Development, AWS, Linux, Python, Java and more." />
      </Helmet>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-hero-light relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl">
            <span className="section-tag">🚀 IT Training & Placement</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
              Launch Your{' '}
              <span className="text-gradient">IT Career</span>
              {' '}With Confidence
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
              Empowering careers through quality IT training and placement services in Chennai & Theni.
              Learn from industry professionals with years of experience.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/training" className="btn-primary btn-lg text-base">
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-outline btn-lg text-base">
                Talk to an Expert
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              {['No Prior Experience Needed', 'Flexible Batches', 'Job Guarantee*'].map(t => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <TechMarquee />

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map(s => <StatCounter key={s.label} {...s} />)}
        </div>
      </section>

      {/* Services */}
      <section className="section bg-section-alt">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-desc">
              From first-day basics to job-day placement — Upvera supports every step of your IT journey.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon: Icon, title, desc, color, link }) => (
              <Link key={title} to={link} className="card p-7 group hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color} transition-all duration-200`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{desc}</p>
                <span className="text-primary-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Upvera */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5">
                We Don't Just Teach —{' '}
                <span className="text-gradient">We Place</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                Upvera Technology bridges the gap between education and employment with
                industry-driven training, expert mentors, and an active placement network
                across Chennai and Theni.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {WHY.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm mb-1">{title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card panel */}
            <div className="relative hidden lg:block">
              <div className="bg-hero-light rounded-3xl p-8 border border-primary-100">
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Enrol in a Course', color: 'bg-sky-100 text-sky-700' },
                    { step: '02', title: 'Train with Industry Experts', color: 'bg-emerald-100 text-emerald-700' },
                    { step: '03', title: 'Build a Strong Portfolio', color: 'bg-violet-100 text-violet-700' },
                    { step: '04', title: 'Get Placed in Top Companies', color: 'bg-amber-100 text-amber-700' },
                  ].map(({ step, title, color }) => (
                    <div key={step} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0 ${color}`}>
                        {step}
                      </span>
                      <p className="font-semibold text-slate-800">{title}</p>
                      <CheckCircle2 size={16} className="ml-auto text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="animate-float absolute -top-5 -right-5 bg-white rounded-2xl shadow-hover px-5 py-3 flex items-center gap-3 border border-slate-100">
                <Star size={16} className="text-amber-400 fill-amber-400" />
                <div>
                  <p className="text-xs font-bold text-slate-800">4.9 / 5.0</p>
                  <p className="text-[10px] text-slate-400">Student Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrol CTA */}
      <section className="section bg-cta">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Start Your IT Journey?</h2>
          <p className="text-sky-100 text-lg mb-10">
            Join 500+ students who transformed their careers with Upvera Technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/training" className="btn-white btn-lg">
              Browse Courses <ArrowRight size={18} />
            </Link>
            <a href="tel:+918667874698" className="btn btn-lg border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4">
              <Phone size={18} /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
