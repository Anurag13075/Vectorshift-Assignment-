

import { useEffect } from 'react';
import './ResultModal.css';

const CheckIcon = () => (
  <svg className="result-modal__check-svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path
      className="result-modal__check-path"
      d="M8 12.5l3 3 5-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ResultModal = ({ status, result, error, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (status === 'idle') return null;

  return (
    <div className="result-modal__backdrop" role="presentation" onClick={onClose}>
      <div
        className="result-modal"
        role="alertdialog"
        aria-modal="true"
        aria-live="assertive"
        onClick={(e) => e.stopPropagation()}
      >
        {status === 'loading' && (
          <div className="result-modal__loading">
            <div className="result-modal__loading-ring">
              <span className="result-modal__spinner" />
            </div>
            <h2 className="result-modal__title">Analyzing pipeline</h2>
            <p className="result-modal__body">Sending your graph to the validation engine…</p>
          </div>
        )}

        {status === 'error' && (
          <>
            <div className="result-modal__icon result-modal__icon--error">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="result-modal__title">Couldn't reach the backend</h2>
            <p className="result-modal__body">
              {error || 'Make sure the FastAPI server is running on http://localhost:8000.'}
            </p>
            <button className="result-modal__button" onClick={onClose}>
              Close
            </button>
          </>
        )}

        {status === 'success' && result && (
          <>
            <div
              className={`result-modal__icon ${
                result.is_dag ? 'result-modal__icon--success' : 'result-modal__icon--warn'
              }`}
            >
              {result.is_dag ? (
                <CheckIcon />
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <path
                    d="M12 8v5m0 3h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            <h2 className="result-modal__title">
              {result.is_dag ? 'Pipeline validated' : 'Cycle detected'}
            </h2>
            <p className="result-modal__body">
              {result.is_dag
                ? 'This pipeline is a valid directed acyclic graph — no cycles found.'
                : 'This pipeline contains a cycle, so it is not a valid DAG.'}
            </p>

            <div className="result-modal__stats">
              <div className="result-modal__stat">
                <span className="result-modal__stat-value">{result.num_nodes}</span>
                <span className="result-modal__stat-label">Nodes</span>
              </div>
              <div className="result-modal__stat">
                <span className="result-modal__stat-value">{result.num_edges}</span>
                <span className="result-modal__stat-label">Edges</span>
              </div>
              <div className="result-modal__stat">
                <span
                  className={`result-modal__stat-value ${
                    result.is_dag ? 'result-modal__stat-value--good' : 'result-modal__stat-value--bad'
                  }`}
                >
                  {result.is_dag ? 'Yes' : 'No'}
                </span>
                <span className="result-modal__stat-label">Is DAG</span>
              </div>
            </div>

            <button className="result-modal__button" onClick={onClose}>
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
};
