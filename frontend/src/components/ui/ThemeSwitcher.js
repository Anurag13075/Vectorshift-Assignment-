export const ThemeSwitcher = ({ value, onChange, classNamePrefix = 'theme-switcher' }) => {
  const options = [
    { value: 'system', label: 'System' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];

  return (
    <div className={`${classNamePrefix}__group`} role="radiogroup" aria-label="Theme selection">
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={`${classNamePrefix}__option${isActive ? ` ${classNamePrefix}__option--active` : ''}`}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
