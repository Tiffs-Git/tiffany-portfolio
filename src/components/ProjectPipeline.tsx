import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Stage {
  label: string;
  detail: string;
}

interface PipelineProject {
  id: number;
  title: string;
  category: string;
  color: string;
  outcome: string;
  stages: Stage[];
  visual: React.FC<{ color: string }>;
}

// ── Project Visuals ───────────────────────────────────────────────────────────

function AgentNetworkVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="100" cy="50" r="42" fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="100" cy="50" r="28" fill="none" stroke={color} strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 4" />

      {/* Connection lines */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + 42 * Math.cos(rad);
        const y = 50 + 42 * Math.sin(rad);
        return <line key={i} x1="100" y1="50" x2={x} y2={y} stroke={color} strokeOpacity="0.2" strokeWidth="0.8" />;
      })}

      {/* Outer agent dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + 42 * Math.cos(rad);
        const y = 50 + 42 * Math.sin(rad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={color} fillOpacity="0.15" />
            <circle cx={x} cy={y} r="3" fill={color} fillOpacity="0.7" />
          </g>
        );
      })}

      {/* Middle ring dots */}
      {[30, 150, 270].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + 28 * Math.cos(rad);
        const y = 50 + 28 * Math.sin(rad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill={color} fillOpacity="0.12" />
            <circle cx={x} cy={y} r="2.5" fill={color} fillOpacity="0.55" />
          </g>
        );
      })}

      {/* Center agent */}
      <circle cx="100" cy="50" r="10" fill={color} fillOpacity="0.12" />
      <circle cx="100" cy="50" r="6" fill={color} fillOpacity="0.9" />
      <circle cx="100" cy="50" r="3" fill="#0c1a2e" fillOpacity="0.8" />
    </svg>
  );
}

function XmlChaosVisual({ color }: { color: string }) {
  const chaosWords = ['@#$%', 'doc_v3', '???', 'final2', 'UNTITLED', '##ref', 'tmp_01', 'xref??'];
  const structuredTags = ['<section>', '<module>', '<depend>', '<audit/>'];
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
      {/* Left: chaos */}
      {chaosWords.map((w, i) => (
        <text
          key={i}
          x={8 + (i % 2) * 42}
          y={18 + Math.floor(i / 2) * 22}
          fontSize="8"
          fill="rgba(221,208,191,0.25)"
          fontFamily="monospace"
          transform={`rotate(${(i % 3) * 8 - 8}, ${20 + (i % 2) * 42}, ${18 + Math.floor(i / 2) * 22})`}
        >
          {w}
        </text>
      ))}

      {/* Arrow in the middle */}
      <line x1="95" y1="50" x2="108" y2="50" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <polygon points="108,47 114,50 108,53" fill={color} fillOpacity="0.5" />

      {/* Right: structured */}
      {structuredTags.map((t, i) => (
        <text
          key={i}
          x="118"
          y={22 + i * 18}
          fontSize="8.5"
          fill={color}
          fillOpacity="0.75"
          fontFamily="monospace"
          fontWeight="600"
        >
          {t}
        </text>
      ))}
    </svg>
  );
}

function FleetDocsVisual({ color }: { color: string }) {
  const scattered = [
    { x: 10, y: 15, r: -12 }, { x: 35, y: 8, r: 8 }, { x: 18, y: 40, r: -6 },
    { x: 50, y: 25, r: 15 }, { x: 28, y: 58, r: -20 }, { x: 62, y: 48, r: 10 },
  ];
  const organized = [
    { x: 118, y: 14 }, { x: 142, y: 14 }, { x: 166, y: 14 },
    { x: 118, y: 38 }, { x: 142, y: 38 }, { x: 166, y: 38 },
    { x: 118, y: 62 }, { x: 142, y: 62 },
  ];
  return (
    <svg viewBox="0 0 200 90" className="w-full h-full" aria-hidden="true">
      {/* Scattered docs */}
      {scattered.map((d, i) => (
        <g key={i} transform={`rotate(${d.r}, ${d.x + 10}, ${d.y + 13})`}>
          <rect x={d.x} y={d.y} width="20" height="26" rx="2"
            fill="rgba(221,208,191,0.06)" stroke="rgba(221,208,191,0.2)" strokeWidth="0.8" />
          <line x1={d.x + 4} y1={d.y + 8} x2={d.x + 16} y2={d.y + 8} stroke="rgba(221,208,191,0.15)" strokeWidth="1" />
          <line x1={d.x + 4} y1={d.y + 13} x2={d.x + 16} y2={d.y + 13} stroke="rgba(221,208,191,0.15)" strokeWidth="1" />
        </g>
      ))}

      {/* Arrow */}
      <line x1="95" y1="45" x2="108" y2="45" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <polygon points="108,42 114,45 108,48" fill={color} fillOpacity="0.5" />

      {/* Organized grid */}
      {organized.map((d, i) => (
        <g key={i}>
          <rect x={d.x} y={d.y} width="18" height="20" rx="2"
            fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1={d.x + 3} y1={d.y + 7} x2={d.x + 15} y2={d.y + 7} stroke={color} strokeOpacity="0.3" strokeWidth="0.8" />
          <line x1={d.x + 3} y1={d.y + 12} x2={d.x + 15} y2={d.y + 12} stroke={color} strokeOpacity="0.3" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}

function TimelineCompressVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
      {/* Before bar — long */}
      <rect x="12" y="20" width="80" height="14" rx="4"
        fill="rgba(221,208,191,0.08)" stroke="rgba(221,208,191,0.25)" strokeWidth="0.8" />
      {[0,1,2,3,4,5,6,7,8,9,11,13,15,17,19].map((s, i) => (
        <rect key={i} x={14 + s * 4.6} y="24" width="3" height="6" rx="1"
          fill="rgba(221,208,191,0.18)" />
      ))}
      <text x="12" y="46" fontSize="8" fill="rgba(221,208,191,0.4)" fontFamily="Inter,sans-serif">20 days</text>

      {/* Arrow down */}
      <line x1="52" y1="52" x2="52" y2="60" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <polygon points="49,60 52,66 55,60" fill={color} fillOpacity="0.5" />

      {/* After bar — compressed */}
      <rect x="12" y="68" width="44" height="14" rx="4"
        fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      {[0,1,2,3,4,5,6,7,8,9].map((s, i) => (
        <rect key={i} x={14 + s * 4} y="72" width="3" height="6" rx="1"
          fill={color} fillOpacity="0.35" />
      ))}
      <text x="12" y="94" fontSize="8" fill={color} fillOpacity="0.7" fontFamily="Inter,sans-serif" fontWeight="600">10 days</text>

      {/* Right side labels */}
      <text x="120" y="32" fontSize="9" fill="rgba(221,208,191,0.3)" fontFamily="Inter,sans-serif">Before</text>
      <text x="120" y="80" fontSize="9" fill={color} fillOpacity="0.7" fontFamily="Inter,sans-serif" fontWeight="600">After</text>
      <text x="118" y="92" fontSize="7.5" fill={color} fillOpacity="0.5" fontFamily="Inter,sans-serif">0 missed deadlines</text>
    </svg>
  );
}

function DocStructureVisual({ color }: { color: string }) {
  const messyLines = [
    { x: 8, y: 14, w: 62 }, { x: 14, y: 24, w: 48 }, { x: 6, y: 34, w: 70 },
    { x: 18, y: 44, w: 40 }, { x: 10, y: 54, w: 58 }, { x: 8, y: 64, w: 66 },
    { x: 16, y: 74, w: 44 }, { x: 12, y: 84, w: 54 },
  ];
  const tree = [
    { x: 118, y: 16, w: 34, indent: 0 },
    { x: 126, y: 30, w: 44, indent: 1 },
    { x: 134, y: 44, w: 36, indent: 2 },
    { x: 134, y: 58, w: 40, indent: 2 },
    { x: 126, y: 72, w: 46, indent: 1 },
    { x: 134, y: 86, w: 32, indent: 2 },
  ];
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
      {/* Left: unstructured text lines */}
      {messyLines.map((l, i) => (
        <rect key={i} x={l.x} y={l.y} width={l.w} height="3.5" rx="1.5"
          fill="rgba(221,208,191,0.18)"
          transform={`rotate(${(i % 3) * 2 - 2}, ${l.x + l.w / 2}, ${l.y})`} />
      ))}

      {/* Arrow */}
      <line x1="90" y1="50" x2="103" y2="50" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <polygon points="103,47 109,50 103,53" fill={color} fillOpacity="0.5" />

      {/* Right: structured tree */}
      {tree.map((n, i) => (
        <g key={i}>
          <circle cx={n.x - 4} cy={n.y + 2} r="2" fill={color} fillOpacity={0.8 - n.indent * 0.2} />
          <rect x={n.x} y={n.y} width={n.w} height="4" rx="2"
            fill={color} fillOpacity={0.55 - n.indent * 0.13} />
        </g>
      ))}
      {/* Tree connector lines */}
      <line x1="114" y1="18" x2="114" y2="88" stroke={color} strokeOpacity="0.25" strokeWidth="0.8" />
    </svg>
  );
}

function TraceMatrixVisual({ color }: { color: string }) {
  const reqs = [16, 34, 52, 70, 88];
  const docs = [20, 44, 68, 88];
  const links: [number, number][] = [[0, 0], [0, 1], [1, 1], [2, 2], [3, 1], [3, 3], [4, 3]];
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
      {/* Left column: requirements */}
      {reqs.map((y, i) => (
        <g key={i}>
          <rect x="14" y={y - 5} width="30" height="11" rx="2"
            fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.45" strokeWidth="0.8" />
          <text x="29" y={y + 3} fontSize="6.5" fill={color} fillOpacity="0.8"
            fontFamily="monospace" textAnchor="middle">REQ-{i + 1}</text>
        </g>
      ))}

      {/* Right column: documents */}
      {docs.map((y, i) => (
        <g key={i}>
          <rect x="156" y={y - 6} width="26" height="13" rx="2"
            fill="rgba(221,208,191,0.06)" stroke="rgba(221,208,191,0.3)" strokeWidth="0.8" />
          <line x1="160" y1={y - 1} x2="178" y2={y - 1} stroke="rgba(221,208,191,0.25)" strokeWidth="0.8" />
          <line x1="160" y1={y + 3} x2="172" y2={y + 3} stroke="rgba(221,208,191,0.25)" strokeWidth="0.8" />
        </g>
      ))}

      {/* Traceability links */}
      {links.map(([r, d], i) => (
        <line key={i} x1="44" y1={reqs[r]} x2="156" y2={docs[d]}
          stroke={color} strokeOpacity="0.35" strokeWidth="0.8" />
      ))}

      {/* Center node */}
      <circle cx="100" cy="52" r="7" fill={color} fillOpacity="0.15" />
      <circle cx="100" cy="52" r="4" fill={color} fillOpacity="0.85" />
    </svg>
  );
}

// ── Project data ──────────────────────────────────────────────────────────────

const pipelineProjects: PipelineProject[] = [
  {
    id: 1,
    title: 'Conversational AI Agent',
    category: 'AI & Automation',
    color: '#3bbcbc',
    outcome: 'First AI-powered search tool across all Flight Ops documentation. Reduced time to locate procedures and training content.',
    visual: AgentNetworkVisual,
    stages: [
      { label: 'Problem Scoped', detail: 'Pilots and instructors had no efficient way to search across manuals and training documentation — finding the right procedure meant knowing where to look.' },
      { label: 'Requirements Defined', detail: 'Use cases, acceptance criteria, and constraints documented for natural language search across all Flight Ops documentation.' },
      { label: 'Vendor Co-Dev', detail: 'Co-developed proprietary conversational AI agent with a technology vendor — bridging operational domain expertise and technical implementation.' },
      { label: 'NLP Search Built', detail: 'Natural language search deployed across the full documentation library, making procedures findable by plain-language queries.' },
      { label: 'Deployed', detail: 'First AI-powered search tool of its kind. Reduced time to locate procedures and training content.' },
    ],
  },
  {
    id: 2,
    title: 'XML/XSD Document Architecture',
    category: 'Regulatory Systems Design',
    color: '#c9a04a',
    outcome: 'First machine-readable dependency map in aviation regulatory compliance. Zero manual tracking. FAA/IOSA audit-ready.',
    visual: XmlChaosVisual,
    stages: [
      { label: 'Gap Identified', detail: 'No machine-readable link between the authoritative manual and 7 cross-fleet training modules — changes caused unknown downstream impact.' },
      { label: 'Architecture Design', detail: 'XML/XSD schema designed to structure the manual and all 7 modules with explicit dependency relationships.' },
      { label: 'Interface Built', detail: 'Queryable HTML interface built to surface every downstream document change required when any manual section updates.' },
      { label: 'Audit Trail Created', detail: 'Defensible traceability record created for FAA and IOSA review — replacing manual spreadsheet tracking entirely.' },
      { label: 'Zero Manual Tracking', detail: 'Fully automated downstream change detection deployed. First machine-readable dependency map of its kind.' },
    ],
  },
  {
    id: 3,
    title: 'Fleet SharePoint Remediation',
    category: 'Digital Footprint Architecture',
    color: '#d4814f',
    outcome: '~66% site reduction. 100% stakeholder adoption within 30 days. Dead sites eliminated, navigation restored.',
    visual: FleetDocsVisual,
    stages: [
      { label: 'Discovery', detail: 'The intranet site collection had grown completely out of control — 7 fleets sharing one SharePoint environment riddled with dead sites, orphaned pages, and no way to tell current from obsolete.' },
      { label: 'Digital Audit', detail: 'Every site and page catalogued, including abandoned sites no one knew were still live. Mapped the full digital footprint before touching anything.' },
      { label: 'Architecture Designed', detail: 'Analyzed all content for common denominators and built one foundational template everything else branches from — a single source of truth, with fleet-specific ownership, consistent naming conventions, and a governed taxonomy.' },
      { label: 'Sites Consolidated', detail: '210+ pages reduced to ~70. Dead sites decommissioned, redundancies removed, ownership clearly assigned per fleet.' },
      { label: '100% Adoption', detail: 'Full stakeholder adoption across all 7 fleets within ~30 days. Governance baked in from day one — because retrofitting standards onto sprawl is the hard lesson this project taught.' },
    ],
  },
  {
    id: 4,
    title: 'Training Workflow Automation',
    category: 'Compliance & Orchestration',
    color: '#e8cf9a',
    outcome: 'Cycle time cut from 20 days → 10 days. Zero missed regulatory deadlines.',
    visual: TimelineCompressVisual,
    stages: [
      { label: 'Process Audited', detail: 'Timing-sensitive compliance steps after pilot transition training were too manual — dependent on individual follow-through and prone to delays.' },
      { label: 'Trigger Designed', detail: 'Workflow logic mapped: training schedule → module completion → compliance form activation at exact training end moment.' },
      { label: 'Automation Built', detail: 'Auto-triggered workflow fires compliance forms the moment training ends, capturing structured feedback in a repeatable format.' },
      { label: 'Feedback Captured', detail: 'Structured feedback loop embedded — every completion generates consistent, usable compliance data without manual entry.' },
      { label: '20 → 10 Days', detail: 'Cycle time halved. Zero missed regulatory deadlines. Manual coordination eliminated.' },
    ],
  },
  {
    id: 5,
    title: 'Document Structuring App',
    category: 'AI & Content Architecture',
    color: '#7ec9a0',
    outcome: 'Unstructured documentation transformed into AI-ready structured content — traceability matrices, audit outputs, and metadata taxonomies generated automatically. Read-only architecture: originals never modified.',
    visual: DocStructureVisual,
    stages: [
      { label: 'Problem Scoped', detail: 'AI query accuracy in production workflows was unreliable — and the root cause was the content itself. Unstructured documentation meant the AI had nothing solid to stand on.' },
      { label: 'Extraction Built', detail: 'Node.js application built to perform structural extraction from source documents — read-only by design, so original documents are never modified.' },
      { label: 'Schema Suggested', detail: 'The app analyzes content and proposes a structure — with human-in-the-loop approval, so a person always validates before anything is standardized.' },
      { label: 'Standards Harmonized', detail: 'Content harmonized against standards with metadata taxonomy classification — turning scattered documents into a consistent, governed library.' },
      { label: 'AI-Ready Output', detail: 'Traceability matrices, compliance audit outputs, and classified metadata generated from source documents. Structure first — that is what makes AI accurate.' },
    ],
  },
  {
    id: 6,
    title: 'ComplianceIQ',
    category: 'Founder Project · Traceability Platform',
    color: '#6aa8e0',
    outcome: 'Multi-industry regulatory traceability platform connecting compliance requirements to internal documentation. Live testing surfaced real compliance gaps and language discrepancies. Built from architecture to MVP.',
    visual: TraceMatrixVisual,
    stages: [
      { label: 'Gap Identified', detail: 'Across industries, compliance requirements live in one world and internal documentation in another — with no traceable link between them, gaps go unnoticed until an audit finds them.' },
      { label: 'Engine Designed', detail: 'Core traceability engine designed to connect regulatory requirements directly to internal documentation — the same architecture pattern proven in aviation compliance work.' },
      { label: 'Dual-Industry MVP', detail: 'MVP built targeting aviation AQP compliance and construction — demonstrating the traceability engine works across sectors, not just one domain.' },
      { label: 'Live Testing', detail: 'Real-world testing surfaced genuine compliance gaps and language discrepancies between requirements and internal documents — validating the core premise.' },
      { label: 'Platform Evolving', detail: 'Active development continues, expanding coverage and refining gap detection. Founder-built and founder-run.' },
    ],
  },
];

const STAGE_DURATION = 3500;
const PROJECT_PAUSE = 800;

// ── Main component ────────────────────────────────────────────────────────────

export default function ProjectPipeline() {
  const [activeId, setActiveId] = useState(pipelineProjects[0].id);
  const [selectedStage, setSelectedStage] = useState(0);
  const [isUserControlled, setIsUserControlled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const project = pipelineProjects.find((p) => p.id === activeId) ?? pipelineProjects[0];
  const Visual = project.visual;

  // Auto-advance logic
  useEffect(() => {
    if (isUserControlled) return;

    timerRef.current = setTimeout(() => {
      const currentProjectIndex = pipelineProjects.findIndex((p) => p.id === activeId);
      const nextStage = selectedStage + 1;

      if (nextStage < project.stages.length) {
        setSelectedStage(nextStage);
      } else {
        // Move to next project
        const nextProjectIndex = (currentProjectIndex + 1) % pipelineProjects.length;
        setTimeout(() => {
          setActiveId(pipelineProjects[nextProjectIndex].id);
          setSelectedStage(0);
        }, PROJECT_PAUSE);
      }
    }, STAGE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeId, selectedStage, isUserControlled, project.stages.length]);

  // Resume auto-play after 8s of inactivity
  useEffect(() => {
    if (!isUserControlled) return;
    const resume = setTimeout(() => setIsUserControlled(false), 8000);
    return () => clearTimeout(resume);
  }, [isUserControlled, activeId, selectedStage]);

  function handleProjectChange(id: number) {
    setIsUserControlled(true);
    setActiveId(id);
    setSelectedStage(0);
  }

  function handleStageClick(i: number) {
    setIsUserControlled(true);
    setSelectedStage(i);
  }

  return (
    <div className="w-full">
      {/* Project selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {pipelineProjects.map((p) => (
          <button
            key={p.id}
            onClick={() => handleProjectChange(p.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 border ${
              p.id === activeId
                ? 'border-transparent text-navy-950 font-semibold'
                : 'border-warm-300/20 text-warm-300/70 hover:border-warm-300/40 hover:text-warm-200 bg-transparent'
            }`}
            style={p.id === activeId ? { background: p.color } : {}}
          >
            {p.title.split(' ').slice(0, 3).join(' ')}
          </button>
        ))}
      </div>

      {/* Category + title */}
      <div className="mb-6">
        <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: project.color }}>
          {project.category}
        </span>
        <h3 className="text-xl font-semibold text-warm-100 mt-1">{project.title}</h3>
      </div>

      {/* Visual + Pipeline side by side on larger screens */}
      <div className="flex flex-col md:flex-row gap-6 mb-2">

        {/* Project visual */}
        <div
          className="w-full md:w-48 flex-shrink-0 rounded-xl border flex items-center justify-center p-3"
          style={{ borderColor: `${project.color}25`, background: `${project.color}08`, minHeight: 110 }}
        >
          <div className="w-full h-24">
            <Visual color={project.color} />
          </div>
        </div>

        {/* Pipeline flow */}
        <div className="flex-1 overflow-x-auto pb-2">
          <div className="flex items-start gap-0 min-w-max">
            {project.stages.map((stage, i) => (
              <div key={i} className="flex items-start">
                <button
                  onClick={() => handleStageClick(i)}
                  className="flex flex-col items-center cursor-pointer group"
                  aria-label={`Select stage: ${stage.label}`}
                >
                  {/* Circle */}
                  <div
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 relative"
                    style={{
                      borderColor: project.color,
                      background: selectedStage === i ? project.color : 'rgba(10,22,40,0.9)',
                      boxShadow: selectedStage === i ? `0 0 14px ${project.color}60` : 'none',
                    }}
                  >
                    {i === project.stages.length - 1 ? (
                      <CheckCircle2 size={15} style={{ color: selectedStage === i ? '#050d1a' : project.color }} />
                    ) : (
                      <span className="text-xs font-bold" style={{ color: selectedStage === i ? '#050d1a' : project.color }}>
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Auto-advance progress dot */}
                  {selectedStage === i && !isUserControlled && (
                    <div className="w-1 h-1 rounded-full mt-1" style={{ background: project.color, opacity: 0.6 }} />
                  )}

                  {/* Label */}
                  <div className="mt-2 w-24 text-center">
                    <p
                      className="text-xs font-semibold leading-tight transition-colors duration-200"
                      style={{ color: selectedStage === i ? project.color : '#ddd0bf' }}
                    >
                      {stage.label}
                    </p>
                  </div>
                </button>

                {/* Arrow */}
                {i < project.stages.length - 1 && (
                  <div className="flex items-center mt-4 mx-1">
                    <div className="w-6 h-px" style={{ background: `${project.color}40` }} />
                    <ArrowRight size={10} style={{ color: `${project.color}60` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stage detail panel */}
      <div
        className="mt-4 rounded-xl border p-5 transition-all duration-300 min-h-[80px]"
        style={{ background: `${project.color}0d`, borderColor: `${project.color}35` }}
      >
        <p className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: project.color }}>
          {project.stages[selectedStage].label}
        </p>
        <p className="text-sm text-warm-300/85 leading-relaxed">
          {project.stages[selectedStage].detail}
        </p>
      </div>

      {/* Outcome banner */}
      <div
        className="mt-4 rounded-xl border p-4"
        style={{ background: 'rgba(10,22,40,0.5)', borderColor: `${project.color}20` }}
      >
        <p className="text-xs tracking-widest uppercase font-semibold mb-1 text-warm-300/50">Outcome</p>
        <p className="text-sm text-warm-300/80 leading-relaxed">{project.outcome}</p>
      </div>
    </div>
  );
}
