import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  ...props
}) => (
  <button
    type="button"
    className={`ui-btn ui-btn--${variant} ui-btn--${size} ${className}`.trim()}
    {...props}
  >
    <span className="ui-btn__label">{children}</span>
    {icon && <span className="ui-btn__icon">{icon}</span>}
  </button>
);

export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
    <path
      d="M5 12h13m0 0-5-5m5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
