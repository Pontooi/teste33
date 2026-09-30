import React from 'react';
import { DualDevProvider, useDualDev } from './context/DualDevContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AcademiaPage } from './pages/AcademiaPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ConquistasPage } from './pages/ConquistasPage';
import { SobrePage } from './pages/SobrePage';

function AppContent() {
  const { activeTab, theme } = useDualDev();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'inicio':
        return <HomePage />;
      case 'academia':
        return <AcademiaPage />;
      case 'playground':
        return <PlaygroundPage />;
      case 'conquistas':
        return <ConquistasPage />;
      case 'sobre':
        return <SobrePage />;
      default:
        return <AcademiaPage />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden ${
        theme === 'dark'
          ? 'dark bg-gradient-to-br from-[#031527] via-[#062038] to-[#031120] text-sky-100 selection:bg-cyan-500/30 selection:text-cyan-200'
          : 'light bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#e6fbf8] text-slate-800 selection:bg-sky-400/30 selection:text-sky-900'
      }`}
    >
      {/* Frutiger Aero Soft Ambient Glows */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden" 
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-sky-400/20 to-teal-300/15 blur-3xl dark:from-cyan-500/10 dark:to-blue-600/10" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-gradient-to-bl from-cyan-300/20 to-emerald-300/15 blur-3xl dark:from-teal-500/10 dark:to-cyan-600/10" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-300/15 to-sky-200/15 blur-3xl dark:from-sky-600/10 dark:to-indigo-600/10" />
      </div>

      <Navbar />
      <main className="relative z-10 flex-1 flex flex-col">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DualDevProvider>
      <AppContent />
    </DualDevProvider>
  );
}
