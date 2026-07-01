const TECHS = [
  { name: 'React',      color: 'bg-sky-50    text-sky-700',     dot: 'bg-sky-400' },
  { name: 'Node.js',    color: 'bg-green-50  text-green-700',   dot: 'bg-green-500' },
  { name: 'Python',     color: 'bg-yellow-50 text-yellow-700',  dot: 'bg-yellow-500' },
  { name: 'AWS Cloud',  color: 'bg-orange-50 text-orange-700',  dot: 'bg-orange-400' },
  { name: 'Linux',      color: 'bg-slate-50  text-slate-700',   dot: 'bg-slate-400' },
  { name: 'MySQL',      color: 'bg-blue-50   text-blue-700',    dot: 'bg-blue-500' },
  { name: 'Java',       color: 'bg-red-50    text-red-700',     dot: 'bg-red-500' },
  { name: 'Flutter',    color: 'bg-cyan-50   text-cyan-700',    dot: 'bg-cyan-500' },
  { name: 'DevOps',     color: 'bg-purple-50 text-purple-700',  dot: 'bg-purple-500' },
  { name: 'Salesforce', color: 'bg-indigo-50 text-indigo-700',  dot: 'bg-indigo-500' },
  { name: 'Windows',    color: 'bg-teal-50   text-teal-700',    dot: 'bg-teal-500' },
];

const DOUBLED = [...TECHS, ...TECHS];

export default function TechMarquee() {
  return (
    <div className="bg-white border-y border-slate-100 py-4 overflow-hidden">
      <p className="text-center text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase mb-3">
        Technologies We Teach
      </p>
      <div
        className="flex gap-3 w-max animate-marquee"
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {DOUBLED.map((t, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                        border border-slate-100 shrink-0 cursor-default hover:-translate-y-0.5
                        transition-transform duration-150 ${t.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dot}`} />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}
