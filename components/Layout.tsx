
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'diagnosis' | 'prevention';
  setActiveTab: (tab: 'diagnosis' | 'prevention') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-800 text-white py-6 shadow-lg border-b-4 border-emerald-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full shadow-inner">
              <i className="fas fa-leaf text-emerald-700 text-2xl"></i>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Зелёный Помощник</h1>
          </div>
          <nav className="flex bg-emerald-700/50 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('diagnosis')}
              className={`px-6 py-2 rounded-md transition-all font-medium ${activeTab === 'diagnosis' ? 'bg-white text-emerald-900 shadow-md' : 'text-emerald-100 hover:text-white'}`}
            >
              <i className="fas fa-notes-medical mr-2"></i>
              Диагностика
            </button>
            <button 
              onClick={() => setActiveTab('prevention')}
              className={`px-6 py-2 rounded-md transition-all font-medium ${activeTab === 'prevention' ? 'bg-white text-emerald-900 shadow-md' : 'text-emerald-100 hover:text-white'}`}
            >
              <i className="fas fa-calendar-check mr-2"></i>
              Профилактика
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-emerald-950 text-emerald-200 py-8 border-t border-emerald-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Твой верный спутник в мире садоводства</p>
          <div className="flex justify-center gap-6 text-xl">
            <i className="fas fa-sun hover:text-yellow-400 transition-colors cursor-pointer"></i>
            <i className="fas fa-cloud-rain hover:text-blue-400 transition-colors cursor-pointer"></i>
            <i className="fas fa-bug hover:text-red-400 transition-colors cursor-pointer"></i>
          </div>
          <p className="mt-4 text-xs opacity-50">© 2024 Зелёный Помощник. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
