

import { useEffect, useRef, useState } from 'react';
import heroFlow from './images/hero-flow.png';
import featureHub from './images/feature-hub.png';
import featureValidate from './images/feature-validate.png';
import featureChain from './images/feature-chain.png';
import './Landing.css';

// Reveals its section the first time it scrolls into view, then leaves it alone.
const useReveal = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
};

// Small looping diagram: pulses travel Input → LLM/Filter → Output, nodes
// light up as the signal reaches them, badge confirms once it lands.
const WorkflowPulse = () => (
  <svg className="pulse" viewBox="0 0 640 160" fill="none" aria-hidden="true">
    <path className="pulse__wire" d="M104,80 C140,80 170,34 210,34" />
    <path className="pulse__wire" d="M104,80 C140,80 170,126 210,126" />
    <path className="pulse__wire" d="M294,34 C330,34 364,80 400,80" />
    <path className="pulse__wire" d="M294,126 C330,126 364,80 400,80" />

    <circle className="pulse__dot pulse__dot--a" r="4" />
    <circle className="pulse__dot pulse__dot--b" r="4" />
    <circle className="pulse__dot pulse__dot--c" r="4" />
    <circle className="pulse__dot pulse__dot--d" r="4" />

    <g className="pulse__node pulse__node--in">
      <rect x="20" y="60" width="84" height="40" rx="8" />
      <text x="62" y="84">INPUT</text>
    </g>
    <g className="pulse__node pulse__node--llm">
      <rect x="210" y="14" width="84" height="40" rx="8" />
      <text x="252" y="38">LLM</text>
    </g>
    <g className="pulse__node pulse__node--filter">
      <rect x="210" y="106" width="84" height="40" rx="8" />
      <text x="252" y="130">FILTER</text>
    </g>
    <g className="pulse__node pulse__node--out">
      <rect x="400" y="60" width="84" height="40" rx="8" />
      <text x="442" y="84">OUTPUT</text>
    </g>

    <g className="pulse__badge">
      <circle cx="540" cy="80" r="15" />
      <path d="M533,80 538,86 549,73" />
    </g>
  </svg>
);

const nodeTypes = [
  { label: 'Input', hint: 'Starts the run' },
  { label: 'LLM', hint: 'Calls a model' },
  { label: 'Text', hint: 'Transforms strings' },
  { label: 'Output', hint: 'Ends the run' },
  { label: 'Math', hint: 'Arithmetic ops' },
  { label: 'Filter', hint: 'Drops by condition' },
  { label: 'API Request', hint: 'Calls a service' },
  { label: 'Database', hint: 'Reads and writes rows' },
  { label: 'Conditional', hint: 'Branches the graph' },
];

const flowSteps = [
  {
    n: '01',
    title: 'Trigger',
    body: 'A webhook, a schedule, or a manual run — pick what starts the pipeline.',
  },
  {
    n: '02',
    title: 'Wire nodes',
    body: 'Drag blocks onto the canvas and connect their handles in the order data should move.',
  },
  {
    n: '03',
    title: 'Validate',
    body: 'The graph is checked for cycles with a real topological sort before anything runs.',
  },
  {
    n: '04',
    title: 'Execute',
    body: 'Nodes run in dependency order, and each one completes on the canvas in real time.',
  },
];

export const Landing = ({ onLaunch }) => {
  const handleLaunch = () => {
    if (onLaunch) onLaunch();
  };

  const [liveRef, liveVisible] = useReveal(0.4);
  const [nodesRef, nodesVisible] = useReveal();
  const [validateRef, validateVisible] = useReveal(0.35);
  const [flowRef, flowVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <div className="landing">
      {/* ---------------------------------------------------------------- */}
      <nav className="nav">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="16" height="16">
              <circle cx="4" cy="10" r="2.4" fill="currentColor" />
              <circle cx="16" cy="10" r="2.4" fill="currentColor" />
              <line x1="6.4" y1="10" x2="13.6" y2="10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <span className="brand__name">Pipeline Studio</span>
        </div>
        <div className="nav__links">
          <a href="#nodes">Nodes</a>
          <a href="#validate">Validation</a>
          <a href="#flow">How it works</a>
        </div>
        <button className="btn btn--ghost" onClick={handleLaunch}>
          Open the builder
        </button>
      </nav>

      {/* ---------------------------------------------------------------- */}
      <header className="hero">
        <div className="hero__text">
          <span className="eyebrow">Visual pipeline builder</span>
          <h1 className="hero__title">
            Wire it up.
            <br />
            Watch it check itself.
          </h1>
          <p className="hero__subtitle">
            Drag nodes onto a canvas, connect them, and hit run. Before a single call fires, the
            backend walks the graph and confirms it's a DAG — no cycles, no surprises.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={handleLaunch}>
              Open the builder
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
                <path
                  d="M5 12h13m0 0-5-5m5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a className="btn btn--text" href="#flow">
              See how it works
            </a>
          </div>
          <div className="hero__chips">
            {nodeTypes.map((n) => (
              <span key={n.label} className="chip">
                {n.label}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__frame">
            <img src={heroFlow} alt="A pipeline of connected nodes on the Pipeline Studio canvas" />
            <div className="hero__badge">
              <svg viewBox="0 0 20 20" width="13" height="13" fill="none">
                <path
                  d="M4 10.5 8 14.5 16 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              DAG confirmed
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      <section
        className={`live${liveVisible ? ' is-visible' : ''}`}
        ref={liveRef}
      >
        <span className="eyebrow live__eyebrow">Live example</span>
        <WorkflowPulse />
        <p className="live__caption">
          Pipelines run left to right — nodes at the same depth run in parallel.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section
        className={`feature reveal${nodesVisible ? ' is-visible' : ''}`}
        id="nodes"
        ref={nodesRef}
      >
        <div className="feature__art">
          <img src={featureHub} alt="A central node connected to five surrounding node types" />
        </div>
        <div className="feature__text">
          <span className="eyebrow">Node library</span>
          <h2 className="feature__title">One shape, every node.</h2>
          <p className="feature__body">
            Input, Output, LLM, or something you dream up — every block renders from the same
            base shape: an icon, a label, a set of fields, evenly spaced handles. A new node type
            is a config entry, not a rewrite.
          </p>
          <ul className="feature__list">
            {nodeTypes.slice(0, 6).map((n) => (
              <li key={n.label}>
                <span className="feature__list-label">{n.label}</span>
                <span className="feature__list-hint">{n.hint}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section
        className={`feature feature--reverse reveal${validateVisible ? ' is-visible' : ''}`}
        id="validate"
        ref={validateRef}
      >
        <div className="feature__art">
          <img src={featureValidate} alt="A validation checkmark for a completed graph check" />
        </div>
        <div className="feature__text">
          <span className="eyebrow">Validation engine</span>
          <h2 className="feature__title">Know it's correct before you run it.</h2>
          <p className="feature__body">
            Hit run, and the graph goes to the backend first. It counts every node and edge, then
            walks the whole thing with a topological sort — a clear pass or fail before anything
            downstream executes.
          </p>
          <div className={`log${validateVisible ? ' log--play' : ''}`}>
            <div className="log__line log__line--1">
              <span className="log__prompt">$</span> pipeline validate
            </div>
            <div className="log__line log__line--ok log__line--2">✓ 9 nodes, 11 edges</div>
            <div className="log__line log__line--ok log__line--3">✓ order: input → llm → filter → output</div>
            <div className="log__line log__line--ok log__line--4">✓ no cycles detected</div>
            <div className="log__line log__line--dim log__line--5">DAG confirmed in 4ms</div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section
        className={`flow reveal${flowVisible ? ' is-visible' : ''}`}
        id="flow"
        ref={flowRef}
      >
        <div className="flow__header">
          <span className="eyebrow">How it works</span>
          <h2 className="feature__title">From trigger to done, laid out plainly.</h2>
          <p className="feature__body flow__body">
            No hidden config, no guessing what runs next. Every step of a pipeline sits on the
            canvas, connected in the order it actually executes.
          </p>
        </div>

        <div className="flow__steps">
          {flowSteps.map((s, i) => (
            <div className="flow__step" key={s.n}>
              <div className="flow__step-num">{s.n}</div>
              <h3 className="flow__step-title">{s.title}</h3>
              <p className="flow__step-body">{s.body}</p>
              {i < flowSteps.length - 1 && <div className="flow__step-line" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="flow__art">
          <img src={featureChain} alt="A chain of connected workflow steps from trigger to completion" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className={`cta reveal${ctaVisible ? ' is-visible' : ''}`} ref={ctaRef}>
        <span className="eyebrow">Start building</span>
        <h2 className="cta__title">Start with a blank canvas.</h2>
        <p className="cta__body">Drag your first node in under a minute.</p>
        <button className="btn btn--primary btn--large" onClick={handleLaunch}>
          Open the builder
        </button>
      </section>

      {/* ---------------------------------------------------------------- */}
      <footer className="footer">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="16" height="16">
              <circle cx="4" cy="10" r="2.4" fill="currentColor" />
              <circle cx="16" cy="10" r="2.4" fill="currentColor" />
              <line x1="6.4" y1="10" x2="13.6" y2="10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <span className="brand__name">Pipeline Studio</span>
        </div>
        <p className="footer__meta">Built with React Flow.</p>
      </footer>
    </div>
  );
};