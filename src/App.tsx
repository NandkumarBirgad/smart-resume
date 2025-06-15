import React, { useState } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { ResumeBuilder } from './components/ResumeBuilder';

function App() {
  const [showBuilder, setShowBuilder] = useState(false);

  if (!showBuilder) {
    return (
      <div className="min-h-screen">
        <Header />
        <LandingPage onGetStarted={() => setShowBuilder(true)} />
      </div>
    );
  }

  return (
    <ResumeProvider>
      <div className="min-h-screen">
        <Header showActions={true} />
        <ResumeBuilder />
      </div>
    </ResumeProvider>
  );
}

export default App;