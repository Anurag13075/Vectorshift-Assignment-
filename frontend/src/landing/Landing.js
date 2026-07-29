import { motion } from 'framer-motion';
import { Brand } from '../components/ui/Brand';
import { HeroPreview } from './HeroPreview';
import { BentoGrid } from './BentoGrid';
import './Landing.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const flowSteps = [
  { n: '01', title: 'Trigger', body: 'Webhook, schedule, or manual — pick what starts the run.' },
  { n: '02', title: 'Wire', body: 'Drag nodes and connect handles in execution order.' },
  { n: '03', title: 'Validate', body: 'Backend runs a topological sort — pass or fail instantly.' },
  { n: '04', title: 'Execute', body: 'Nodes run in dependency order on the canvas.' },
];

const WorkflowPulse = () => (
  <svg className="landing-pulse" viewBox="0 0 640 120" fill="none" aria-hidden="true">
    <path className="landing-pulse__wire" d="M80,60 C120,60 150,24 200,24" />
    <path className="landing-pulse__wire" d="M80,60 C120,60 150,96 200,96" />
    <path className="landing-pulse__wire" d="M280,24 C320,24 350,60 400,60" />
    <path className="landing-pulse__wire" d="M280,96 C320,96 350,60 400,60" />
    <circle className="landing-pulse__dot landing-pulse__dot--a" r="3" />
    <circle className="landing-pulse__dot landing-pulse__dot--b" r="3" />
    {[
      [20, 40, 60, 40, 'INPUT'],
      [200, 4, 80, 40, 'LLM'],
      [200, 76, 80, 40, 'FILTER'],
      [400, 40, 80, 40, 'OUTPUT'],
    ].map(([x, y, w, h, label]) => (
      <g key={label}>
        <rect x={x} y={y} width={w} height={h} rx="8" className="landing-pulse__node" />
        <text x={x + w / 2} y={y + h / 2 + 4} className="landing-pulse__label">{label}</text>
      </g>
    ))}
  </svg>
);

export const Landing = ({ onLaunch }) => (
  <div className="landing">
    <div className="landing__aurora" aria-hidden="true">
      <div className="landing__aurora-blob landing__aurora-blob--1" />
      <div className="landing__aurora-blob landing__aurora-blob--2" />
    </div>
    <div className="landing__grain" aria-hidden="true" />

    <motion.nav
      className="landing__nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Brand onClick={onLaunch} />
      <div className="landing__nav-links">
        <a href="#features">Features</a>
        <a href="#flow">How it works</a>
      </div>
      <button type="button" className="landing__nav-cta" onClick={onLaunch}>
        Open builder
      </button>
    </motion.nav>

    <section className="landing__hero">
      <motion.div className="landing__hero-copy" variants={stagger} initial="hidden" animate="visible">
        <motion.span className="landing__eyebrow" variants={fadeUp}>
          Visual pipeline builder
        </motion.span>
        <motion.h1 className="landing__headline" variants={fadeUp}>
          Build pipelines
          <br />
          <span className="landing__headline-accent">that validate themselves.</span>
        </motion.h1>
        <motion.p className="landing__desc" variants={fadeUp}>
          Drag nodes, wire connections, hit run. Before anything executes, the graph proves
          it's a DAG — no cycles, no surprises.
        </motion.p>
        <motion.div className="landing__actions" variants={fadeUp}>
          <button type="button" className="landing__btn-primary" onClick={onLaunch}>
            Open the builder
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a className="landing__btn-ghost" href="#features">
            Explore features
          </a>
        </motion.div>
        <motion.div className="landing__metrics" variants={fadeUp}>
          <div><strong>9</strong> node types</div>
          <div><strong>&lt;5ms</strong> validation</div>
          <div><strong>100%</strong> client-side canvas</div>
        </motion.div>
      </motion.div>

      <div className="landing__hero-visual">
        <HeroPreview />
      </div>
    </section>

    <BentoGrid />

    <section className="landing__flow" id="flow">
      <motion.div
        className="landing__flow-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="landing__eyebrow">How it works</span>
        <h2 className="landing__flow-title">From trigger to done.</h2>
      </motion.div>

      <motion.div
        className="landing__flow-pulse-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <WorkflowPulse />
      </motion.div>

      <div className="landing__flow-steps">
        {flowSteps.map((step, i) => (
          <motion.div
            key={step.n}
            className="landing__flow-step"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="landing__flow-num">{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="landing__cta">
      <motion.div
        className="landing__cta-inner"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Start with a blank canvas.</h2>
        <p>Drag your first node in under a minute.</p>
        <button type="button" className="landing__btn-primary landing__btn-primary--lg" onClick={onLaunch}>
          Open the builder
        </button>
      </motion.div>
    </section>

    <footer className="landing__footer">
      <Brand onClick={onLaunch} />
      <span className="landing__footer-meta">Built with React Flow</span>
    </footer>
  </div>
);
