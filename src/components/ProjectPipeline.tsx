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

function TrendFlowVisual({ color }: { color: string }) {
  const sources = [14, 32, 50, 68, 86];
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
      {/* Left: five platform signals */}
      {sources.map((y, i) => (
        <g key={i}>
          <circle cx="18" cy={y} r="5" fill={color} fillOpacity="0.12" />
          <circle cx="18" cy={y} r="3" fill={color} fillOpacity="0.65" />
          <line x1="23" y1={y} x2="88" y2="50" stroke={color} strokeOpacity="0.25" strokeWidth="0.8" />
        </g>
      ))}

      {/* Center: the engine */}
      <circle cx="97" cy="50" r="13" fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="97" cy="50" r="6" fill={color} fillOpacity="0.85" />
      <circle cx="97" cy="50" r="2.5" fill="#0c1a2e" fillOpacity="0.8" />

      {/* Arrow to product */}
      <line x1="112" y1="50" x2="138" y2="50" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <polygon points="138,47 144,50 138,53" fill={color} fillOpacity="0.5" />

      {/* Right: finished product */}
      <rect x="150" y="32" width="34" height="36" rx="3"
        fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
      <line x1="156" y1="42" x2="178" y2="42" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
      <line x1="156" y1="50" x2="172" y2="50" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="167" cy="60" r="3.5" fill={color} fillOpacity="0.5" />
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
    title: 'Regulatory Traceability Engine',
    category: 'Regulatory Systems Design',
    color: '#c9a04a',
    outcome: 'First machine-readable regulatory dependency map of its kind in aviation compliance — benchmarked one-to-one against the IOSA standard. Zero manual tracking. FAA/IOSA audit-ready.',
    visual: XmlChaosVisual,
    stages: [
      { label: 'Zero Documentation', detail: 'Nothing connected regulatory requirements to internal compliance artifacts — the traceability matrix had to be reverse-engineered from raw XML and DITA source with no map to start from.' },
      { label: 'Industry Benchmark', detail: 'Contacted IOSA to obtain their XML structure and mapped it one-to-one before building anything — anchoring the architecture to the international audit standard from day one.' },
      { label: 'Schema Built', detail: 'XML/XSD schema designed to structure the authoritative manual and 7 cross-fleet training modules with explicit dependency relationships.' },
      { label: 'Queryable Interface', detail: 'HTML interface surfaces every downstream document change required when any section updates — replacing manual spreadsheet tracking entirely.' },
      { label: 'Audit-Ready', detail: 'Defensible traceability record for FAA and IOSA review. First machine-readable dependency map of its kind in aviation compliance.' },
    ],
  },
  {
    id: 3,
    title: 'The Drift Audit',
    category: 'Document Forensics & Governance',
    color: '#d4814f',
    outcome: 'One critical manual living in 17 places became a single governed source of truth. ~66% page reduction. 100% stakeholder adoption within 30 days.',
    visual: FleetDocsVisual,
    stages: [
      { label: 'Full Download', detail: 'Pulled the entire document library and every fleet site page for offline cross-analysis — the only way to see the whole picture at once.' },
      { label: '17 Versions Found', detail: 'Cross-referenced where every document actually lived. One safety-critical operations manual appeared on 17 different pages — and the versions did not all match.' },
      { label: 'Common Denominators', detail: 'Analyzed all content for shared structure and built one foundational template everything else branches from — a single source of truth with fleet-specific ownership and a governed taxonomy.' },
      { label: 'The Consolidation', detail: '210+ pages reduced to ~70. Dead sites decommissioned, duplicate copies eliminated, ownership clearly assigned per fleet.' },
      { label: '100% Adoption', detail: 'Full stakeholder adoption across all 7 fleets within ~30 days. Governance baked in from day one — because retrofitting standards onto sprawl is the hard way.' },
    ],
  },
  {
    id: 5,
    title: 'The Content Refinery',
    category: 'AI Infrastructure',
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
    title: 'Trend-to-Product Pipeline',
    category: 'Independent Venture · Autonomous E-Commerce',
    color: '#6aa8e0',
    outcome: 'A self-running commerce pipeline: five platforms scanned daily, one human input, finished products out — validated by real sales across a live storefront.',
    visual: TrendFlowVisual,
    stages: [
      { label: 'Signal Scan', detail: 'Automated daily sweep of five platforms — TikTok, Instagram, Pinterest, Reddit, and Google — extracting trending themes and market gaps in real time.' },
      { label: 'One Input', detail: 'A single theme is the only human touchpoint in the entire system. Everything downstream runs itself.' },
      { label: 'Generation', detail: 'Python pipelines produce the content, design assets, and SEO copy — assembled automatically into a finished digital product package.' },
      { label: 'To Market', detail: 'Listings optimized with multi-layered keyword analysis pulled from live marketplace data — built to be found, not just posted.' },
      { label: 'Sales-Validated', detail: 'Measurable sales impact across a 60-item storefront. The system proves itself in revenue, not demos.' },
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
