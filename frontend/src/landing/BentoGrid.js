import { motion } from 'framer-motion';
import './BentoGrid.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cards = [
  {
    id: 'nodes',
    size: 'large',
    label: 'Node library',
    title: 'One config. Every node.',
    body: 'Nine node types from a single abstraction — icon, fields, handles. Add a new block with one config entry.',
    visual: 'hub',
  },
  {
    id: 'dag',
    size: 'medium',
    label: 'Validation',
    title: 'DAG check before run',
    body: 'Topological sort confirms your graph is acyclic.',
    visual: 'terminal',
  },
  {
    id: 'text',
    size: 'medium',
    label: 'Text node',
    title: 'Auto-resize + variables',
    body: '{{variable}} syntax creates input handles automatically.',
    visual: 'text',
  },
  {
    id: 'canvas',
    size: 'wide',
    label: 'Canvas',
    title: 'Drag. Connect. Ship.',
    body: 'React Flow canvas with snap-to-grid, minimap, and smooth edge routing.',
    visual: 'canvas',
  },
  {
    id: 'speed',
    size: 'small',
    label: 'Speed',
    title: '< 5ms',
    body: 'Validation latency',
    visual: 'stat',
  },
  {
    id: 'types',
    size: 'small',
    label: 'Types',
    title: '9 nodes',
    body: 'Input to conditional',
    visual: 'stat',
  },
];

const HubVisual = () => (
  <svg viewBox="0 0 200 140" className="bento-viz" aria-hidden="true">
    <circle cx="100" cy="70" r="22" fill="rgba(94,106,210,0.15)" stroke="#5e6ad2" strokeWidth="1" />
    {[
      [40, 30], [160, 30], [40, 110], [160, 110], [100, 15],
    ].map(([x, y], i) => (
      <g key={i}>
        <line x1="100" y1="70" x2={x + 20} y2={y + 12} stroke="rgba(255,255,255,0.08)" />
        <rect x={x} y={y} width="40" height="24" rx="6" fill="#111" stroke="rgba(255,255,255,0.1)" />
      </g>
    ))}
  </svg>
);

const TerminalVisual = () => (
  <div className="bento-terminal" aria-hidden="true">
    <div><span className="bento-terminal__prompt">$</span> validate</div>
    <div className="bento-terminal__ok">✓ no cycles</div>
    <div className="bento-terminal__ok">✓ 9 nodes</div>
    <div className="bento-terminal__dim">4ms</div>
  </div>
);

const TextVisual = () => (
  <div className="bento-text-viz" aria-hidden="true">
    <code>{'Hello {{name}}'}</code>
    <span className="bento-text-viz__chip">name</span>
  </div>
);

const CanvasVisual = () => (
  <svg viewBox="0 0 400 80" className="bento-canvas-viz" aria-hidden="true">
    <rect width="400" height="80" rx="8" fill="#0a0a0a" stroke="rgba(255,255,255,0.06)" />
    {[60, 180, 300].map((x, i) => (
      <g key={i}>
        <rect x={x} y="26" width="56" height="28" rx="6" fill="#111" stroke={['#2FC7A6','#8B7FF0','#4ade80'][i]} strokeWidth="1" />
        {i < 2 && <path d={`M${x + 56},40 L${x + 124},40`} stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />}
      </g>
    ))}
  </svg>
);

const visualMap = {
  hub: HubVisual,
  terminal: TerminalVisual,
  text: TextVisual,
  canvas: CanvasVisual,
  stat: () => null,
};

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
        const Visual = visualMap[card.visual];
        return (
          <motion.article
            key={card.id}
            className={`bento__card bento__card--${card.size}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={i + 1}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="bento__card-glow" aria-hidden="true" />
            <span className="bento__card-label">{card.label}</span>
            <h3 className="bento__card-title">{card.title}</h3>
            {card.body && <p className="bento__card-body">{card.body}</p>}
            {Visual && card.visual !== 'stat' && (
              <div className="bento__card-visual">
                <Visual />
              </div>
            )}
            {card.visual === 'stat' && (
              <div className="bento__stat">
                <span className="bento__stat-value">{card.title}</span>
                <span className="bento__stat-label">{card.body}</span>
              </div>
            )}
          </motion.article>
        );
      })}
    </div>
  </section>
);
