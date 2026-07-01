import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, Clock, Users, ArrowRight,
  Code2, Server, Terminal, Cloud, Monitor, BarChart3, PenTool, Box,
} from 'lucide-react';

const COURSES = [
  {
    icon: Code2,
    title: 'IT Software Development',
    badge: 'Most Popular',
    badgeColor: 'badge-blue',
    duration: '3 Months',
    type: 'Course & Internship',
    desc: 'Industry-driven training across a wide range of technologies. Choose your specialisation and get job-ready with hands-on projects.',
    topics: [
      'Java', 'Python', 'MERN Stack', 'ReactJS', 'Angular',
      'Flutter', 'Kotlin', 'AI / ML', 'Salesforce', 'MuleSoft',
      'C', 'C++', 'Desktop Support', 'Network Support',
      'Linux', 'AWS', 'Wintel', 'AutoCAD', 'CATIA',
    ],
    color: 'border-sky-200 hover:border-sky-400',
    iconBg: 'bg-sky-50 text-sky-600',
    accentBg: 'bg-sky-50',
  },
  {
    icon: Monitor,
    title: 'IT Support & Networking',
    badge: 'Beginner Friendly',
    badgeColor: 'badge-green',
    duration: '2 Months',
    type: 'Course',
    desc: 'Learn hardware troubleshooting, networking basics, OS administration, and helpdesk skills needed for IT support roles.',
    topics: ['Hardware & Software', 'Networking Basics', 'Windows & Linux OS', 'Active Directory', 'Troubleshooting', 'ITIL Concepts'],
    color: 'border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-50 text-emerald-600',
    accentBg: 'bg-emerald-50',
  },
  {
    icon: Terminal,
    title: 'Linux Administration',
    badge: 'High Demand',
    badgeColor: 'badge-blue',
    duration: '2 Months',
    type: 'Course & Internship',
    desc: 'Deep dive into Linux system administration — shell scripting, user management, server configuration, and security.',
    topics: ['Linux CLI & Shell', 'File System & Permissions', 'User & Group Management', 'Bash Scripting', 'Apache & Nginx', 'Security & Firewall'],
    color: 'border-violet-200 hover:border-violet-400',
    iconBg: 'bg-violet-50 text-violet-600',
    accentBg: 'bg-violet-50',
  },
  {
    icon: Server,
    title: 'Windows Server Administration',
    badge: 'Corporate Ready',
    badgeColor: 'badge-amber',
    duration: '2 Months',
    type: 'Course',
    desc: 'Enterprise Windows Server skills — AD DS, Group Policy, DNS, DHCP, and virtualization for corporate IT environments.',
    topics: ['Windows Server 2022', 'Active Directory DS', 'Group Policy (GPO)', 'DNS & DHCP', 'Hyper-V', 'PowerShell'],
    color: 'border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-50 text-amber-600',
    accentBg: 'bg-amber-50',
  },
  {
    icon: Cloud,
    title: 'AWS Cloud Practitioner',
    badge: 'Certification',
    badgeColor: 'badge-blue',
    duration: '6 Weeks',
    type: 'Course',
    desc: 'Prepare for the AWS Cloud Practitioner certification. Learn core AWS services, architecture, pricing, and security fundamentals.',
    topics: ['AWS Core Services', 'EC2, S3, RDS', 'IAM & Security', 'VPC & Networking', 'Cloud Cost Management', 'Certification Prep'],
    color: 'border-orange-200 hover:border-orange-400',
    iconBg: 'bg-orange-50 text-orange-600',
    accentBg: 'bg-orange-50',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics with Python',
    badge: 'New Batch',
    badgeColor: 'badge-green',
    duration: '3 Months',
    type: 'Course & Internship',
    desc: 'Python programming for data analysis, visualization, and reporting. Covers Pandas, NumPy, Matplotlib, and SQL integration.',
    topics: ['Python Basics', 'Pandas & NumPy', 'Data Visualization', 'SQL for Analytics', 'Excel & Power BI', 'Projects'],
    color: 'border-cyan-200 hover:border-cyan-400',
    iconBg: 'bg-cyan-50 text-cyan-600',
    accentBg: 'bg-cyan-50',
  },
  {
    icon: PenTool,
    title: 'AutoCAD Training',
    badge: 'Mechanical',
    badgeColor: 'badge-amber',
    duration: '2 Months',
    type: 'Course & Internship',
    dept: 'Mechanical Engineering',
    desc: 'Comprehensive AutoCAD training for Mechanical Engineering students — 2D drafting, 3D modelling, and industry drawing standards with hands-on practical sessions.',
    topics: ['2D Drawing & Drafting', '3D Solid Modelling', 'Dimensioning & Annotations', 'Layers & Blocks', 'Engineering Drawing Standards', 'Practical Projects'],
    color: 'border-yellow-200 hover:border-yellow-400',
    iconBg: 'bg-yellow-50 text-yellow-600',
    accentBg: 'bg-yellow-50',
  },
  {
    icon: Box,
    title: 'CATIA Training',
    badge: 'Mechanical',
    badgeColor: 'badge-amber',
    duration: '2 Months',
    type: 'Course & Internship',
    dept: 'Mechanical Engineering',
    desc: 'Industry-standard CATIA V5/V6 training for Mechanical Engineering — 3D part design, assembly, surface modelling, and manufacturing drawings with hands-on practical sessions.',
    topics: ['Part Design & Modelling', 'Assembly Design', 'Generative Shape Design', 'Surface Modelling', 'Drafting & GD&T', 'Practical Projects'],
    color: 'border-rose-200 hover:border-rose-400',
    iconBg: 'bg-rose-50 text-rose-600',
    accentBg: 'bg-rose-50',
  },
];

const BENEFITS = [
  'Small batches (max 15 students) for personalised attention',
  'Hands-on projects with real client datasets',
  'Industry-certified trainers with 10+ years experience',
  'Flexible morning, evening & weekend batches',
  'Internship certificate upon completion',
  'Resume building and mock interview sessions',
  'Lifetime access to course materials',
  'Job referrals through our placement network',
];

export default function Training() {
  return (
    <>
      <Helmet>
        <title>IT Training Programs — Upvera Technology</title>
        <meta name="description" content="Explore professional IT training programs at Upvera Technology — Software Development, Linux, Windows Server, AWS Cloud, and more in Chennai & Theni." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 px-4 bg-hero-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <span className="section-tag">Training Programs</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 max-w-2xl">
            Industry-Ready <span className="text-gradient">IT Courses</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Practical, project-based training programs designed to get you hired — not just certified.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-tag">Our Courses</span>
            <h2 className="section-title">Choose Your Learning Path</h2>
            <p className="section-desc">Each course is structured to take you from beginner to job-ready in the shortest possible time.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {COURSES.map(({ icon: Icon, title, badge, badgeColor, duration, type, dept, desc, topics, color, iconBg, accentBg }) => (
              <div key={title} className={`card border-2 ${color} transition-all duration-300 hover:shadow-hover hover:-translate-y-1 flex flex-col`}>
                <div className={`${accentBg} p-6 rounded-t-2xl`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={badgeColor}>{badge}</span>
                      {dept && <span className="badge badge-slate text-[10px]">{dept}</span>}
                    </div>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug mb-2">{title}</h3>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {type}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{desc}</p>

                  <div className="grid grid-cols-2 gap-1.5 mb-6">
                    {topics.map(t => (
                      <div key={t} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 size={12} className="text-primary-500 shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Link to="/contact" className="btn-primary w-full justify-center">
                      Enrol Now <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-tag">Why Train With Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                More Than a Course —<br />
                <span className="text-gradient">A Complete Career Launch</span>
              </h2>
              <p className="text-slate-500 leading-relaxed">
                At Upvera, training is just the beginning. We stay with you until you land the job.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {BENEFITS.map(b => (
                <div key={b} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-card">
                  <CheckCircle2 size={16} className="text-primary-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Not Sure Which Course to Pick?</h2>
          <p className="text-sky-100 mb-8">Talk to our career advisors for a free consultation — we will guide you to the right path.</p>
          <Link to="/contact" className="btn-white btn-lg">
            Free Career Counselling <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
