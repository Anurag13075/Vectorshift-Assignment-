import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './HeroPreview.css';

const nodes = [
  { id: 'in', label: 'Trigger', x: 56, y: 142, color: 'var(--accent-2)', w: 92, h: 38 },
  { id: 'llm', label: 'LLM', x: 202, y: 62, color: 'var(--accent)', w: 80, h: 38 },
  { id: 'filter', label: 'Filter', x: 202, y: 212, color: '#8fa98a', w: 80, h: 38 },
  { id: 'out', label: 'Output', x: 348, y: 142, color: 'var(--success)', w: 92, h: 38 },
];

const edges = [
  { from: 'in', to: 'llm', delay: 0 },
  { from: 'in', to: 'filter', delay: 0.15 },
  { from: 'llm', to: 'out', delay: 1.1 },
  { from: 'filter', to: 'out', delay: 1.25 },
];

const statusMessages = ['DAG validated', '0 cycles found', '4 nodes ready'];

const getCenter = (id) => {
  const n = nodes.find((node) => node.id === id);
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
};

const pathFor = (from, to) => {
  const a = getCenter(from);
  const b = getCenter(to);
  return `M${a.x},${a.y} C${(a.x + b.x) / 2},${a.y} ${(a.x + b.x) / 2},${b.y} ${b.x},${b.y}`;
};

export const HeroPreview = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  const [statusIndex, setStatusIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1) % statusMessages.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="hero-preview"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <div className="hero-preview__chrome">
        <div className="hero-preview__dots">
          <span /><span /><span />
        </div>
        <span className="hero-preview__url">pipeline.studio / build</span>
      </div>

      <div className="hero-preview__canvas">
        <svg className="hero-preview__edges" viewBox="0 0 480 280" preserveAspectRatio="xMidYMid meet">
          {edges.map(({ from, to }) => (
            <motion.path
              key={`${from}-${to}`}
              d={pathFor(from, to)}
              fill="none"
              stroke="rgba(237,239,230,0.14)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            />
          ))}

          {edges.map(({ from, to, delay }) => (
            <motion.circle
              key={`pulse-${from}-${to}`}
              r="3"
              fill={to === 'out' ? 'var(--success)' : from === 'in' ? 'var(--accent-2)' : 'var(--accent)'}
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{ offsetDistance: ['0%', '0%', '100%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.9,
                delay: 1.4 + delay,
                repeat: Infinity,
                repeatDelay: 1.3,
                times: [0, 0.05, 0.65, 1],
                ease: 'easeInOut',
              }}
              style={{ offsetPath: `path('${pathFor(from, to)}')` }}
            />
          ))}
        </svg>

        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="hero-preview__node"
            style={{
              left: node.x,
              top: node.y,
              width: node.w,
              height: node.h,
              '--node-color': node.color,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-preview__node-dot" />
            {node.label}
          </motion.div>
        ))}

        <div className="hero-preview__badge">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
            <path d="M3 8.5 6.5 12 13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={statusMessages[statusIndex]}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {statusMessages[statusIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};