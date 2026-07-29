import { motion, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './BentoGrid.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const HubVisual = () => (
  <svg viewBox="0 0 200 140" className="bento-viz bento-hub" aria-hidden="true">
    <circle className="bento-hub__center" cx="100" cy="70" r="22" fill="rgba(227,150,62,0.14)" stroke="var(--accent)" strokeWidth="1.2" />
    {[[40, 30], [160, 30], [40, 110], [160, 110], [100, 15]].map(([x, y], i) => (
      <g key={i} className="bento-hub__node" style={{ animationDelay: `${i * 0.35}s` }}>
        <line x1="100" y1="70" x2={x + 20} y2={y + 12} stroke="rgba(237,239,230,0.1)" />
        <rect x={x} y={y} width="40" height="24" rx="6" fill="var(--bg-raised)" stroke="rgba(237,239,230,0.12)" />
      </g>
    ))}
  </svg>
);

const TerminalVisual = () => (
  <div className="bento-terminal" aria-hidden="true">
    <div className="bento-terminal__line bento-terminal__line--1"><span className="bento-terminal__prompt">$</span> validate --graph</div>
    <div className="bento-terminal__line bento-terminal__line--2 bento-terminal__ok">✓ no cycles found</div>
    <div className="bento-terminal__line bento-terminal__line--3 bento-terminal__ok">✓ 9 nodes resolved</div>
    <div className="bento-terminal__line bento-terminal__line--4 bento-terminal__dim">4ms<span className="bento-terminal__cursor" /></div>
  </div>
);

const TextVisual = () => (
  <div className="bento-text-viz" aria-hidden="true">
    <code>Hello {'{{'}<span className="bento-text-viz__var">name</span>{'}}'}<span className="bento-terminal__cursor" /></code>
    <span className="bento-text-viz__chip">name</span>
  </div>
);

const CanvasVisual = () => (
  <svg viewBox="0 0 400 80" className="bento-canvas-viz" aria-hidden="true">
    <rect width="400" height="80" rx="8" fill="var(--bg-surface)" stroke="rgba(237,239,230,0.06)" />
    {[60, 180, 300].map((x, i) => (
      <g key={i}>
        <rect x={x} y="26" width="56" height="28" rx="6" fill="var(--bg-raised)" stroke={['var(--accent-2)', 'var(--accent)', 'var(--success)'][i]} strokeWidth="1" />
        {i < 2 && (
          <path
            id={`canvas-wire-${i}`}
            d={`M${x + 56},40 L${x + 124},40`}
            stroke="rgba(237,239,230,0.12)"
            strokeWidth="1.2"
          />
        )}
      </g>
    ))}
    <circle r="2.5" fill="var(--accent-2)" className="bento-canvas-viz__pulse bento-canvas-viz__pulse--1" />
    <circle r="2.5" fill="var(--accent)" className="bento-canvas-viz__pulse bento-canvas-viz__pulse--2" />
  </svg>
);

const DagVisual = () => (
  <div className="bento-dag" aria-hidden="true">
    <svg viewBox="0 0 140 120" className="bento-dag__valid">
      <path d="M30,90 L70,30 L110,90" fill="none" stroke="rgba(237,239,230,0.14)" strokeWidth="1.4" />
      {[[30, 90], [70, 30], [110, 90]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="var(--bg-raised)" stroke="var(--success)" strokeWidth="1.4" />
      ))}
      <path className="bento-dag__check" d="M58,50 L67,60 L84,40" fill="none" stroke="var(--success)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <svg viewBox="0 0 140 120" className="bento-dag__cycle">
      <path d="M30,90 L70,30 L110,90 L30,90" fill="none" stroke="rgba(226,88,75,0.4)" strokeWidth="1.4" />
      {[[30, 90], [70, 30], [110, 90]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="var(--bg-raised)" stroke="var(--danger)" strokeWidth="1.4" />
      ))}
      <text x="70" y="70" textAnchor="middle" className="bento-dag__x">✕</text>
    </svg>
  </div>
);

const CountUp = ({ prefix = '', value, decimals = 0, suffix = '' }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState((0).toFixed(decimals));
  const [started, setStarted] = useState(false);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => {
        if (started) return;
        setStarted(true);
        animate(0, value, {
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setDisplay(v.toFixed(decimals)),
        });
      }}
      viewport={{ once: true, margin: '-20px' }}
    >
      {prefix}{display}{suffix}
    </motion.span>
  );
};

const cards = [
  {
    id: 'nodes',
    label: 'Node library',
    title: 'One config. Every node.',
    body: 'Nine node types from a single abstraction — icon, fields, handles. Add a new block with one config entry.',
    Visual: HubVisual,
  },
  {
    id: 'dag',
    label: 'Validation',
    title: 'Cycles caught before they run',
    body: 'A topological sort confirms the graph is acyclic on every connection.',
    Visual: DagVisual,
  },
  {
    id: 'text',
    label: 'Text node',
    title: 'Auto-resize + variables',
    body: '{{variable}} syntax creates input handles automatically.',
    Visual: TextVisual,
  },
  {
    id: 'canvas',
    label: 'Canvas',
    title: 'Drag. Connect. Ship.',
    body: 'A React Flow canvas with snap-to-grid, minimap, and smooth edge routing.',
    Visual: CanvasVisual,
  },
  {
    id: 'speed',
    label: 'Speed',
    stat: { prefix: '<', value: 5, suffix: 'ms' },
    body: 'Validation latency',
  },
  {
    id: 'types',
    label: 'Types',
    stat: { value: 9, suffix: ' nodes' },
    body: 'Input to conditional',
  },
];

export const BentoGrid = () => (
  <section className="bento" id="features">
    <motion.div
      className="bento__header"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      custom={0}
    >
      <span className="bento__eyebrow">Features</span>
      <h2 className="bento__title">Everything you need to build pipelines.</h2>
      <p className="bento__subtitle">
        A visual builder that validates itself — designed for speed, clarity, and confidence.
      </p>
    </motion.div>

    <div className="bento__grid">
      {cards.map((card, i) => {
        const Visual = card.Visual;
        return (
          <motion.article
            key={card.id}
            className={`bento__card bento__card--${card.id}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={i + 1}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="bento__card-glow" aria-hidden="true" />
            <span className="bento__card-label">{card.label}</span>
            {card.stat ? (
              <div className="bento__stat">
                <span className="bento__stat-value">
                  <CountUp prefix={card.stat.prefix} value={card.stat.value} suffix={card.stat.suffix} />
                </span>
                <span className="bento__stat-label">{card.body}</span>
              </div>
            ) : (
              <>
                <h3 className="bento__card-title">{card.title}</h3>
                {card.body && <p className="bento__card-body">{card.body}</p>}
                {Visual && (
                  <div className="bento__card-visual">
                    <Visual />
                  </div>
                )}
              </>
            )}
          </motion.article>
        );
      })}
    </div>
  </section>
);