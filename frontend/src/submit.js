// submit.js

import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { ResultModal } from './components/ResultModal';
import './submit.css';

const API_BASE = process.env.REACT_APP_API_BASE || '';
const PARSE_URL = API_BASE
  ? `${API_BASE}/pipelines/parse`
  : '/api/pipelines/parse';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(PARSE_URL, {
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

  const isLoading = status === 'loading';

  return (
    <>
      <button
        className={`run-btn${isLoading ? ' run-btn--loading' : ''}`}
        onClick={handleSubmit}
        disabled={nodes.length === 0 || isLoading}
        title={nodes.length === 0 ? 'Add at least one node to run' : 'Validate pipeline'}
      >
        {isLoading ? (
          <>
            <span className="run-btn__spinner" aria-hidden="true" />
            <span>Validating…</span>
          </>
        ) : (
          <>
            <span>Run pipeline</span>
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden="true">
              <path
                d="M5 12h13m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      <ResultModal status={status} result={result} error={error} onClose={() => setStatus('idle')} />
    </>
  );
};
