import { Wrench, Plane, Users, ClipboardCheck } from 'lucide-react';

const stats = [
  { value: '10 years', label: 'Facilitating at Delta Air Lines' },
  { value: '4,000', label: 'People onboarded across the enterprise' },
  { value: 'TTT', label: 'Certified train-the-trainer, maintenance & pilot training' },
];

const domains = [
  {
    icon: Wrench,
    title: 'Aircraft Maintenance',
    desc: 'Instructional systems design and live facilitation for maintenance teams in hangars and warehouses, where a documentation error is a federal problem.',
    color: 'text-orange-400',
    border: 'border-orange-600/40',
    bg: 'bg-orange-900/20',
  },
  {
    icon: Plane,
    title: 'Pilot Training',
    desc: 'Design and facilitation within FAA pilot training programs, from the simulator to the tarmac, built on standards, evidence, and repeatable delivery.',
    color: 'text-teal-400',
    border: 'border-teal-700/40',
    bg: 'bg-teal-900/20',
  },
  {
    icon: ClipboardCheck,
    title: 'Training the Trainers',
    desc: 'Certified train-the-trainer in both aircraft maintenance and pilot training. I lead trainers who train the trainers, and I run instructor observations and evaluations live in the operation.',
    color: 'text-gold-300',
    border: 'border-gold-700/40',
    bg: 'bg-gold-900/20',
  },
  {
    icon: Users,
    title: 'Lean Six Sigma',
    desc: 'Facilitating sessions for Lean Six Sigma Green Belt and Black Belt courses, teaching the methodology and data tools behind real process improvement.',
    color: 'text-fuchsia-400',
    border: 'border-fuchsia-600/30',
    bg: 'bg-fuchsia-900/10',
  },
];

const topicGroups = [
  {
    label: 'Technical',
    items: ['Aircraft Maintenance', 'Pilot Training', 'Enterprise Systems', 'Technical Enablement'],
    color: 'text-teal-300',
    chip: 'text-teal-300 border-teal-700/40 bg-teal-900/20',
  },
  {
    label: 'Process Improvement',
    items: ['Lean Six Sigma Black Belt', 'Lean Six Sigma Green Belt'],
    color: 'text-gold-300',
    chip: 'text-gold-300 border-gold-700/40 bg-gold-900/20',
  },
  {
    label: 'Instructor Development',
    items: ['Train-the-Trainer', 'Instructor Observations & Evaluations'],
    color: 'text-copper-300',
    chip: 'text-copper-300 border-copper-600/40 bg-navy-800/40',
  },
  {
    label: 'Soft Skills & Onboarding',
    items: ['Emotional Intelligence', 'De-escalation', 'Enterprise Onboarding'],
    color: 'text-fuchsia-300',
    chip: 'text-fuchsia-300 border-fuchsia-600/40 bg-fuchsia-900/20',
  },
];

export default function Instruction() {
  return (
    <section id="instruction" className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-gold-500/50" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Technical Instruction</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight">
          From Soft Skills to<br />
          <span className="text-gradient-gold">Enterprise Systems</span>
        </h2>
        <p className="text-warm-300/70 text-sm leading-relaxed mt-4 max-w-3xl">
          Instructional systems designer and facilitator with a range few trainers cover: soft skills, non-technical and technical subjects, enterprise systems, and Lean Six Sigma, plus FAA-regulated aircraft maintenance and pilot training. With a background in psychology and communications, I build the course, teach it live, and coach the trainers who teach it next.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="card-base border-warm-300/10 bg-navy-800/40 text-center">
            <p className="font-display text-3xl text-gradient-gold">{s.value}</p>
            <p className="text-warm-300/60 text-xs tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {domains.map((d) => (
          <div key={d.title} className={`card-base ${d.border} ${d.bg} flex flex-col gap-3`}>
            <div className={d.color}>
              <d.icon size={26} strokeWidth={1.5} />
            </div>
            <h3 className={`font-semibold text-sm tracking-wide ${d.color}`}>{d.title}</h3>
            <p className="text-warm-300/70 text-sm leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        <p className="text-xs tracking-widest uppercase font-semibold text-warm-300/40 mb-3">Range of Topics Taught</p>
        <div className="flex flex-col gap-3">
          {topicGroups.map((g) => (
            <div key={g.label} className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-semibold w-full sm:w-40 ${g.color}`}>{g.label}</span>
              {g.items.map((t) => (
                <span key={t} className={`text-xs px-3 py-1.5 rounded-full border font-medium ${g.chip}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
