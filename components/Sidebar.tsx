
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface SidebarProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (cat: Category | 'All') => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, isOpen }) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">CivEngine</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-1">
            <button
              onClick={() => onSelectCategory('All')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${selectedCategory === 'All' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              All Tools
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${selectedCategory === cat ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>
        
        <div className="p-4 bg-slate-50 mt-auto">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
               <img src="https://picsum.photos/40/40" alt="Avatar" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Pro User</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Civil Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
