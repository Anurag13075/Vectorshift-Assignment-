import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  themeMode: 'system',
  setThemeMode: () => {},
  resolvedTheme: 'dark',
});

const getInitialThemeMode = () => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const storedTheme = window.localStorage.getItem('pipeline-theme-mode');
  return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
    ? storedTheme
    : 'system';
};

const getResolvedTheme = (themeMode) => {
  if (themeMode === 'light' || themeMode === 'dark') {
    return themeMode;
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  return 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);
  const [resolvedTheme, setResolvedTheme] = useState(() => getResolvedTheme(getInitialThemeMode()));

  useEffect(() => {
    const updateTheme = () => {
      const nextTheme = getResolvedTheme(themeMode);
      setResolvedTheme(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      document.documentElement.style.colorScheme = nextTheme;
      window.localStorage.setItem('pipeline-theme-mode', themeMode);
    };

    updateTheme();

    if (themeMode === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const listener = () => updateTheme();
      mediaQuery.addEventListener?.('change', listener);
      return () => mediaQuery.removeEventListener?.('change', listener);
    }
  }, [themeMode]);

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      resolvedTheme,
    }),
    [themeMode, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
