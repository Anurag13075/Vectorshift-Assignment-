// submit.js

import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { ResultModal } from './components/ResultModal';
import './submit.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button className="submit-bar__button" onClick={handleSubmit} disabled={nodes.length === 0}>
          <span>Run pipeline</span>
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path
              d="M5 12h13m0 0-5-5m5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <ResultModal status={status} result={result} error={error} onClose={() => setStatus('idle')} />
    </>
  );
};
