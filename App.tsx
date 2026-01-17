
import React, { useState, useMemo } from 'react';
import { Category, Tool } from './types';
import { TOOLS } from './constants';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import CalculatorUI from './components/CalculatorUI';
import EngineerChat from './components/EngineerChat';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        selectedCategory={selectedCategory} 
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
      />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 hover:bg-slate-100 rounded-lg lg:hidden text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
            <h1 className="text-xl font-bold text-slate-800 hidden md:block">Toolbox Dashboard</h1>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative group">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search calculators, estimators..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                New Project
             </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* Hero / Quick Post */}
          <div className="mb-10 bg-gradient-to-br from-slate-900 to-blue-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 backdrop-blur-md border border-blue-500/30">Feature Article</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Design of RCC — How to find zero force members in Truss</h2>
                <p className="text-blue-100/70 text-sm md:text-lg mb-8 leading-relaxed">Master the 3 Easy Steps to identify non-load-bearing components in truss structures and optimize your designs today.</p>
                <button className="px-6 py-3 bg-white text-blue-900 font-bold rounded-2xl hover:bg-blue-50 transition-all active:scale-95 flex items-center gap-2">
                   Read Guide
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
             </div>
             <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M0 0L100 100M100 0L0 100" stroke="currentColor" strokeWidth="2" />
                   <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
                </svg>
             </div>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Toolbox</h2>
              <p className="text-sm text-slate-500">Browsing {selectedCategory === 'All' ? 'Every Engineering Tool' : selectedCategory}</p>
            </div>
            <div className="text-xs font-medium text-slate-400">
               {filteredTools.length} results found
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onClick={() => setActiveTool(tool)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">No tools matched your search</h3>
              <p className="text-sm text-slate-500 mt-1">Try using different keywords or selecting "All Tools".</p>
            </div>
          )}
        </div>
      </main>

      {/* Active Calculator Modal */}
      {activeTool && (
        <CalculatorUI 
          tool={activeTool} 
          onClose={() => setActiveTool(null)} 
        />
      )}

      {/* Floating AI Support */}
      <EngineerChat />
    </div>
  );
};

export default App;
