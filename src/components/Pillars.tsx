import { Puzzle, Bot, ShieldCheck, FileSearch, GraduationCap, ServerCog } from 'lucide-react';

const pillars = [
  {
    icon: Puzzle,
    title: 'Process Systematization',
    desc: 'Taking organizational chaos and building methodology to untangle it—step by step, dependency by dependency.',
    color: 'text-orange-400',
    border: 'border-orange-600/40',
    bg: 'bg-orange-900/20',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    desc: 'Reading the requirements others skip. Building FAA-compliant frameworks with audit trails baked in from day one.',
    color: 'text-teal-400',
    border: 'border-teal-700/40',
    bg: 'bg-teal-900/20',
  },
  {
    icon: Bot,
    title: 'AI Agent Orchestration',
    desc: 'Building customized AI Agents to manage repetitive workflows that you can trust.',
    color: 'text-green-400',
    border: 'border-green-700/40',
    bg: 'bg-green-900/20',
  },
  {
    icon: FileSearch,
    title: 'Digital Transformation',
    desc: 'Modernizing legacy systems at enterprise scale. The unglamorous, critical work that everyone postpones—done right.',
    color: 'text-red-400',
    border: 'border-red-700/40',
    bg: 'bg-red-900/20',
  },
  {
    icon: GraduationCap,
    title: 'Learning & Enablement',
    desc: 'Certified instructional designer and facilitator. Curriculum, classrooms, and job aids built for the moment it clicks—onboarding 3,500+ across an enterprise.',
    color: 'text-fuchsia-400',
    border: 'border-fuchsia-600/30',
    bg: 'bg-fuchsia-900/10',
  },
  {
    icon: ServerCog,
    title: 'Platform Ownership',
    desc: 'Standing administrator of seven enterprise platforms. Access, governance, and vendor management that keep systems accurate, secure, and audit-ready.',
    color: 'text-yellow-300',
    border: 'border-yellow-600/40',
    bg: 'bg-yellow-900/20',
  },
];

export default function Pillars() {
  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-gold-500/50" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Core Disciplines</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight">
          What I Do
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pillars.map((p) => (
          <div
            key={p.title}
            className={`card-base ${p.border} ${p.bg} flex flex-col gap-3`}
          >
            <div className={`${p.color} mb-1`}>
              <p.icon size={26} strokeWidth={1.5} />
            </div>
            <h3 className={`font-semibold text-sm tracking-wide ${p.color}`}>{p.title}</h3>
            <p className="text-warm-300/70 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
