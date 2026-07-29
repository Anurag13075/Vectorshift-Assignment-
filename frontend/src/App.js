import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Landing } from './landing/Landing';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Brand } from './components/ui/Brand';
import './App.css';

const Builder = () => (
  <div className="builder">
    <header className="builder__topbar">
      <Brand to="/" className="builder__brand" />
      <div className="builder__topbar-meta">
        <span className="builder__badge">Builder</span>
      </div>
      <div className="builder__topbar-actions">
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

const LandingPage = () => {
  const navigate = useNavigate();
  return <Landing onLaunch={() => navigate('/build')} />;
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
