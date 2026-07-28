

import { useEffect } from 'react';
import './ResultModal.css';

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
            <span className="result-modal__spinner" />
            <p>Sending your pipeline to the backend…</p>
          </div>
        )}

        {status === 'error' && (
          <>
            <div className="result-modal__icon result-modal__icon--error">✕</div>
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
              {result.is_dag ? '✓' : '!'}
            </div>
            <h2 className="result-modal__title">Pipeline analyzed</h2>
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
