import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Arun Kumar',     role: 'Software Developer',     company: 'TCS, Chennai',          course: 'IT Software Dev',   rating: 5, text: "Upvera's training completely transformed my career path. The hands-on projects and placement support helped me land a job at TCS within 2 months of completing the course." },
  { name: 'Priya Lakshmi',  role: 'Cloud Support Engineer', company: 'Infosys, Bengaluru',    course: 'AWS Cloud',         rating: 5, text: "The AWS course at Upvera was exceptional. The trainer explained complex concepts with real examples. I cleared my AWS exam on the first attempt and got placed quickly." },
  { name: 'Karthik Rajan',  role: 'Linux Administrator',    company: 'HCL, Chennai',          course: 'Linux Admin',       rating: 5, text: "Before joining Upvera, I had zero Linux knowledge. After 2 months of training, I was confident enough to handle production servers. Best investment I made." },
  { name: 'Deepa Murugan',  role: 'IT Support Engineer',    company: 'Wipro, Chennai',        course: 'IT Support',        rating: 5, text: "The trainers at Upvera are very patient and knowledgeable. They helped me build my resume from scratch and coached me for every interview round. Highly recommend!" },
  { name: 'Sathish Babu',   role: 'DevOps Engineer',        company: 'Tech Mahindra, Chennai',course: 'IT Software Dev',   rating: 5, text: "I was a non-IT graduate who had no hope of breaking into tech. Upvera not only trained me but also helped me crack interviews at Tech Mahindra. Life-changing experience." },
  { name: 'Meena Devi',     role: 'Windows Administrator',  company: 'Cognizant, Chennai',    course: 'Windows Server',    rating: 5, text: "The Windows Server course was very comprehensive. From Active Directory to PowerShell — everything was taught practically. Got placed at Cognizant within weeks." },
  { name: 'Rajesh Pandi',   role: 'Network Engineer',       company: 'Airtel, Madurai',       course: 'IT Support',        rating: 5, text: "Upvera's placement team worked tirelessly to get me interviews. Their mock interview sessions were especially valuable — I felt fully prepared for every round." },
  { name: 'Kavitha S.',     role: 'Data Analyst',           company: 'Accenture, Chennai',    course: 'Data Analytics',    rating: 5, text: "The Python and data analytics training was superb. Real datasets, real problems. I joined Accenture as a data analyst — something I would never have imagined before Upvera." },
  { name: 'Suresh M.',      role: 'Software Developer',     company: 'Zoho, Chennai',         course: 'IT Software Dev',   rating: 5, text: "The full-stack training here is genuinely industry-level. I learned React, Node, and deployment. The trainers are always available even after class hours." },
  { name: 'Anitha R.',      role: 'Cloud Engineer',         company: 'AWS Partner, Bengaluru',course: 'AWS Cloud',         rating: 5, text: "Upvera gave me the confidence I lacked. Their placement team knew exactly which companies to approach for my profile. Got 2 offers within a month of completing training." },
  { name: 'Vijay Kumar',    role: 'IT Support Engineer',    company: 'Sutherland, Chennai',   course: 'IT Support',        rating: 4, text: "Good training environment with experienced faculty. The practical labs and troubleshooting sessions were the most helpful part of the course." },
  { name: 'Nandhini K.',    role: 'Linux Admin',            company: 'IBM, Chennai',          course: 'Linux Admin',       rating: 5, text: "I am working at IBM now, all thanks to Upvera! The training quality is excellent, the staff is supportive, and the placement support is unmatched in this region." },
];

const HIGHLIGHTS = [
  { val: '4.9/5', label: 'Average Rating',   sub: 'Based on 400+ reviews' },
  { val: '98%',   label: 'Recommend Us',     sub: 'Would refer to a friend' },
  { val: '95%',   label: 'Placement Rate',   sub: 'Within 3 months' },
  { val: '500+',  label: 'Success Stories',  sub: 'Placed students' },
];

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={13} className={i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      <Helmet>
        <title>Student Testimonials — Upvera Technology</title>
        <meta name="description" content="Read success stories from Upvera Technology students who transformed their careers through our IT training and placement programs." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 px-4 bg-hero-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <span className="section-tag">Student Stories</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 max-w-2xl">
            Real Students. <span className="text-gradient">Real Results.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Hear from the 500+ students who chose Upvera and transformed their careers.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {HIGHLIGHTS.map(({ val, label, sub }) => (
            <div key={label} className="card p-6 text-center">
              <p className="text-3xl font-extrabold text-gradient mb-1">{val}</p>
              <p className="font-bold text-slate-800 text-sm">{label}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="section bg-section-alt">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-tag">What They Say</span>
            <h2 className="section-title">Words From Our Alumni</h2>
            <p className="section-desc">Every story is a testament to the quality of training and dedication of our placement team.</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map(({ name, role, company, course, rating, text }) => (
              <div key={name} className="break-inside-avoid card p-6 hover:shadow-hover transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <StarRow count={rating} />
                  <Quote size={20} className="text-primary-200 shrink-0" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600
                                  flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{name}</p>
                    <p className="text-xs text-slate-500">{role} · {company}</p>
                    <span className="badge-blue text-[10px] mt-1 px-2 py-0.5">{course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Your Success Story Starts Here</h2>
          <p className="text-sky-100 mb-8">Join 500+ students who built their IT careers with Upvera Technology.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/training" className="btn-white btn-lg">Browse Courses <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn-lg border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4">Talk to Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
