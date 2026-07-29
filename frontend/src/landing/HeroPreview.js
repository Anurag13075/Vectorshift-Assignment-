import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './HeroPreview.css';

const nodes = [
  { id: 'in', label: 'Input', x: 60, y: 140, color: '#2FC7A6', w: 90, h: 38 },
  { id: 'llm', label: 'LLM', x: 200, y: 70, color: '#8B7FF0', w: 80, h: 38 },
  { id: 'filter', label: 'Filter', x: 200, y: 200, color: '#4DA3FF', w: 80, h: 38 },
  { id: 'out', label: 'Output', x: 340, y: 140, color: '#4ade80', w: 90, h: 38 },
];

const edges = [
  { from: 'in', to: 'llm' },
  { from: 'in', to: 'filter' },
  { from: 'llm', to: 'out' },
  { from: 'filter', to: 'out' },
];

const getCenter = (id) => {
  const n = nodes.find((node) => node.id === id);
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
};

export const HeroPreview = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

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
          {edges.map(({ from, to }) => {
            const a = getCenter(from);
            const b = getCenter(to);
            return (
              <motion.path
                key={`${from}-${to}`}
                d={`M${a.x},${a.y} C${(a.x + b.x) / 2},${a.y} ${(a.x + b.x) / 2},${b.y} ${b.x},${b.y}`}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
              />
            );
          })}
          <motion.circle
            r="3"
            fill="var(--accent)"
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            style={{ offsetPath: `path('M${getCenter('in').x},${getCenter('in').y} C${(getCenter('in').x + getCenter('llm').x) / 2},${getCenter('in').y} ${(getCenter('in').x + getCenter('llm').x) / 2},${getCenter('llm').y} ${getCenter('llm').x},${getCenter('llm').y}')` }}
          />
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

        <motion.div
          className="hero-preview__badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
            <path d="M3 8.5 6.5 12 13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          DAG validated
        </motion.div>
      </div>
    </motion.div>
  );
};
