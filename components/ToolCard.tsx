
import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all group"
    >
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      </div>
      <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-700">{tool.name}</h3>
      <p className="text-xs text-slate-500 line-clamp-2">{tool.description}</p>
      <div className="mt-4 flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit uppercase tracking-tighter">
        {tool.category}
      </div>
    </button>
  );
};

export default ToolCard;
