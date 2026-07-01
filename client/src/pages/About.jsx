import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Star, Lightbulb, Heart,
  ArrowRight, CheckCircle2, Users, Award,
  GraduationCap, Building2,
} from 'lucide-react';

const VALUES = [
  { icon: Star,      title: 'Excellence',   desc: 'We maintain the highest standards in every training and placement service we deliver.',       color: 'bg-amber-50  text-amber-600' },
  { icon: Heart,     title: 'Student-First', desc: "Every decision we make is guided by what is best for our students' growth and success.",    color: 'bg-rose-50   text-rose-600'  },
  { icon: Lightbulb, title: 'Innovation',   desc: 'Curriculum stays current with rapidly evolving industry demands and emerging technologies.',   color: 'bg-violet-50 text-violet-600'},
  { icon: Users,     title: 'Community',    desc: 'We build a strong alumni network that continues to support each other beyond graduation.',      color: 'bg-sky-50    text-sky-600'   },
];


export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — Upvera Technology</title>
        <meta name="description" content="Learn about Upvera Technology's mission to deliver quality IT training and placement services across Chennai and Theni since 2019." />
      </Helmet>

      {/* Page Header */}
      <section className="pt-28 pb-16 px-4 bg-hero-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <span className="section-tag">About Upvera</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 max-w-2xl">
            Shaping IT Careers Since <span className="text-gradient">2019</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            A training & placement consultancy built on one belief — every student deserves a real shot at a tech career.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Your Trusted IT Career Partner
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Upvera Technology is a leading IT training and placement consultancy with centres
                  in <strong className="text-slate-700">Chennai</strong> and{' '}
                  <strong className="text-slate-700">Theni</strong>, Tamil Nadu. Since 2019, we have
                  empowered hundreds of students and fresh graduates to break into the IT industry.
                </p>
                <p>
                  Our programs are meticulously designed to bridge the gap between academic
                  knowledge and industry expectations — combining theoretical foundations with
                  hands-on, real-world project experience.
                </p>
                <p>
                  We work directly with hiring companies to understand their talent needs and
                  tailor our training accordingly, ensuring our graduates are job-ready from day one.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Chennai Campus', 'Theni Campus', 'Online Batches'].map(tag => (
                  <span key={tag} className="badge-blue">{tag}</span>
                ))}
              </div>
            </div>

            {/* Stats visual */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '500+', label: 'Students Trained',  bg: 'bg-sky-500',     icon: GraduationCap },
                { val: '95%',  label: 'Placement Rate',    bg: 'bg-emerald-500', icon: CheckCircle2 },
                { val: '50+',  label: 'Company Partners',  bg: 'bg-violet-500',  icon: Building2 },
                { val: '5+',   label: 'Years of Trust',    bg: 'bg-amber-500',   icon: Award },
              ].map(({ val, label, bg, icon: Icon }) => (
                <div key={label} className={`${bg} rounded-2xl p-6 text-white`}>
                  <Icon size={24} className="mb-3 opacity-80" />
                  <p className="text-3xl font-extrabold">{val}</p>
                  <p className="text-sm opacity-80 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-section-alt">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-tag">Our Purpose</span>
            <h2 className="section-title">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 border-l-4 border-primary-400">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                <Target size={22} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed">
                To deliver high-quality, industry-relevant IT training and comprehensive placement
                support that equips students with the skills, confidence, and connections needed
                to build rewarding technology careers.
              </p>
            </div>
            <div className="card p-8 border-l-4 border-emerald-400">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
                <Eye size={22} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed">
                To become South India's most trusted IT training and placement ecosystem — a place
                where every aspiring tech professional finds the right guidance, skills, and
                opportunities to achieve their career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-tag">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-desc">The principles that guide everything we do at Upvera Technology.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-hover p-7 text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${color}`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-extrabold text-slate-900 mb-3">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Join the Upvera Family</h2>
          <p className="text-sky-100 mb-8">500+ alumni can't be wrong. Take the first step toward your IT career today.</p>
          <Link to="/contact" className="btn-white btn-lg">
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
