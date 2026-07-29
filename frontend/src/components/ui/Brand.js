import { Link } from 'react-router-dom';
import './Brand.css';

export const BrandMark = () => (
  <span className="brand-mark" aria-hidden="true">
    <svg viewBox="0 0 20 20" width="16" height="16">
      <circle cx="4" cy="10" r="2.4" fill="currentColor" />
      <circle cx="16" cy="10" r="2.4" fill="currentColor" />
      <line x1="6.4" y1="10" x2="13.6" y2="10" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  </span>
);

export const Brand = ({ to, onClick, className = '' }) => {
  const content = (
    <>
      <BrandMark />
      <span className="brand__name">Pipeline Studio</span>
    </>
  );

  const cls = `brand ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} aria-label="Pipeline Studio home">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={cls}>{content}</div>;
};
