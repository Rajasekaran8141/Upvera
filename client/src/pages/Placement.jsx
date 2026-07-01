import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, Briefcase, FileText,
  Users, Building2, TrendingUp, Award, Star, UserCheck,
} from 'lucide-react';

const STEPS = [
  { num: '01', title: 'Profile Assessment',   desc: 'We assess your skills, strengths, and career goals to map the right opportunities for you.',      icon: UserCheck  },
  { num: '02', title: 'Resume Building',       desc: 'Our experts craft an ATS-optimised, role-specific resume that stands out to recruiters.',          icon: FileText   },
  { num: '03', title: 'Interview Coaching',    desc: 'Technical and HR mock interviews with detailed feedback to build your confidence.',                 icon: Users      },
  { num: '04', title: 'Company Referrals',     desc: 'Direct referrals to our network of 50+ hiring partner companies looking for fresh talent.',        icon: Building2  },
  { num: '05', title: 'Offer Negotiation',     desc: 'Guidance on evaluating offers, negotiating salary, and making the best career decision.',          icon: TrendingUp },
  { num: '06', title: 'Post-Placement Support',desc: 'We stay in touch after joining to help you settle in and succeed in your new role.',               icon: Award      },
];

const ROLES = [
  { title: 'Software Developer',      skills: 'React, Node, Python',  color: 'bg-sky-50    text-sky-700    border-sky-200'    },
  { title: 'IT Support Engineer',     skills: 'Helpdesk, Networking', color: 'bg-emerald-50 text-emerald-700 border-emerald-200'},
  { title: 'Linux System Admin',      skills: 'Linux, Bash, SSH',     color: 'bg-violet-50 text-violet-700 border-violet-200'  },
  { title: 'Cloud Engineer',          skills: 'AWS, Azure, GCP',      color: 'bg-orange-50 text-orange-700 border-orange-200'  },
  { title: 'DevOps Engineer',         skills: 'CI/CD, Docker, K8s',   color: 'bg-cyan-50   text-cyan-700   border-cyan-200'    },
  { title: 'Windows Administrator',   skills: 'AD, GPO, PowerShell',  color: 'bg-amber-50  text-amber-700  border-amber-200'   },
  { title: 'Data Analyst',            skills: 'Python, SQL, Power BI',color: 'bg-pink-50   text-pink-700   border-pink-200'    },
  { title: 'Network Engineer',        skills: 'Cisco, CCNA, VPN',     color: 'bg-indigo-50 text-indigo-700 border-indigo-200'  },
];

const STATS = [
  { val: '95%',  label: 'Placement Rate',    sub: 'within 3 months of course completion', color: 'bg-sky-500' },
  { val: '50+',  label: 'Hiring Partners',   sub: 'active companies in our network',       color: 'bg-emerald-500' },
  { val: '₹3–8L', label: 'Avg. CTC Range',  sub: 'for freshers from our batches',         color: 'bg-violet-500' },
  { val: '500+', label: 'Placed Students',   sub: 'across Chennai, Bengaluru & beyond',    color: 'bg-amber-500' },
];

export default function Placement() {
  return (
    <>
      <Helmet>
        <title>Placement Services — Upvera Technology</title>
        <meta name="description" content="Upvera Technology offers end-to-end IT placement services — resume building, interview coaching, and referrals to 50+ companies in Chennai and Theni." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 px-4 bg-hero-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <span className="section-tag">Placement Services</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 max-w-2xl">
            We Don't Stop Until <span className="text-gradient">You Get Hired</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Comprehensive placement support with a 95% success rate — from resume to offer letter.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map(({ val, label, sub, color }) => (
            <div key={label} className={`${color} rounded-2xl p-6 text-white`}>
              <p className="text-3xl font-extrabold mb-1">{val}</p>
              <p className="font-bold text-sm opacity-90">{label}</p>
              <p className="text-xs opacity-70 mt-1 leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section bg-section-alt">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">Our 6-Step Placement Process</h2>
            <p className="section-desc">A structured, end-to-end process that takes you from trained candidate to hired professional.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map(({ num, title, desc, icon: Icon }) => (
              <div key={num} className="card p-7 hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-extrabold">{num}</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Icon size={18} className="text-slate-500" />
                  </div>
                </div>
                <h3 className="font-extrabold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Roles */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-tag">Career Paths</span>
            <h2 className="section-title">Roles Our Students Land</h2>
            <p className="section-desc">From entry-level support to cloud engineering — our graduates work across a wide range of IT roles.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROLES.map(({ title, skills, color }) => (
              <div key={title} className={`flex flex-col gap-2 p-5 rounded-2xl border ${color} hover:-translate-y-1 transition-all duration-200`}>
                <div className="w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
                  <Briefcase size={16} />
                </div>
                <p className="font-bold text-slate-900 text-sm">{title}</p>
                <p className="text-xs opacity-70">{skills}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-tag">What We Provide</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Complete Placement <span className="text-gradient">Ecosystem</span>
              </h2>
              <div className="space-y-4">
                {[
                  'ATS-optimised resume crafted by HR experts',
                  'LinkedIn profile optimisation for recruiter visibility',
                  'Technical mock interviews with senior engineers',
                  'HR interview practice and soft skills coaching',
                  'Direct company referrals — not just job board listings',
                  'Salary negotiation guidance and offer evaluation',
                  'Interview scheduling and calendar coordination',
                  'Post-joining support for the first 90 days',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 size={17} className="text-primary-500 shrink-0" />
                    <p className="text-slate-700 text-sm">{f}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-8 bg-gradient-to-br from-primary-50 to-white border-primary-100">
              <div className="flex items-center gap-3 mb-6">
                <Star size={20} className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-slate-800">Recent Placement Highlights</span>
              </div>
              {[
                { name: 'Software Developer',     company: 'Tech MNC, Chennai',    ctc: '₹4.5 LPA',  color: 'bg-sky-100    text-sky-700'    },
                { name: 'Cloud Support Engineer', company: 'AWS Partner, Bengaluru',ctc: '₹5.2 LPA',  color: 'bg-orange-100 text-orange-700' },
                { name: 'Linux Administrator',    company: 'IT Firm, Chennai',     ctc: '₹3.8 LPA',  color: 'bg-violet-100 text-violet-700' },
                { name: 'IT Support Engineer',    company: 'BPO/IT, Theni',        ctc: '₹2.8 LPA',  color: 'bg-emerald-100 text-emerald-700'},
              ].map(({ name, company, ctc, color }) => (
                <div key={name} className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{name}</p>
                    <p className="text-xs text-slate-400">{company}</p>
                  </div>
                  <span className={`badge ${color}`}>{ctc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Start Your IT Career?</h2>
          <p className="text-sky-100 mb-8">Enrol today and let our placement team work for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/training" className="btn-white btn-lg">View Courses <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn-lg border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
