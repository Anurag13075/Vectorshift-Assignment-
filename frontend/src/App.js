import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Landing } from './landing/Landing';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

const Builder = () => (
  <div className="app">
    <PipelineToolbar />
    <PipelineUI />
    <SubmitButton />
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