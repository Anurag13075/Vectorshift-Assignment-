import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Landing } from './landing/Landing';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Brand } from './components/ui/Brand';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher';
import { useTheme } from './ThemeContext';
import './App.css';

const Builder = () => {
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();

  return (
    <div className="builder">
      <header className="builder__topbar">
        <Brand to="/" className="builder__brand" />
        <div className="builder__topbar-meta">
          <span className="builder__badge">Builder</span>
        </div>
        <div className="builder__topbar-actions">
          <ThemeSwitcher
            value={themeMode}
            onChange={setThemeMode}
            classNamePrefix="builder__theme"
          />
          <span className="builder__theme-status" title={`Current theme: ${resolvedTheme}`}>
            {resolvedTheme === 'dark' ? <FiMoon /> : <FiSun />}
          </span>
          <SubmitButton />
        </div>
      </header>
      <div className="builder__body">
        <PipelineToolbar />
        <main className="builder__canvas">
          <PipelineUI />
        </main>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  return (
    <Landing
      onLaunch={() => navigate('/build')}
      themeMode={themeMode}
      setThemeMode={setThemeMode}
      resolvedTheme={resolvedTheme}
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/build" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
