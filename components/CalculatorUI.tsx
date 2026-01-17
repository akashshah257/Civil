
import React, { useState, useEffect } from 'react';
import { Tool } from '../types';

interface CalculatorUIProps {
  tool: Tool;
  onClose: () => void;
}

const CalculatorUI: React.FC<CalculatorUIProps> = ({ tool, onClose }) => {
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    tool.fields?.forEach(f => {
      initial[f.id] = f.defaultValue as number || 0;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  useEffect(() => {
    if (tool.calculation) {
      setResults(tool.calculation(inputs));
    }
  }, [inputs, tool]);

  const handleInputChange = (id: string, value: string) => {
    const val = parseFloat(value);
    setInputs(prev => ({ ...prev, [id]: isNaN(val) ? 0 : val }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <div>
                <h2 className="font-bold text-slate-800">{tool.name}</h2>
                <p className="text-xs text-slate-500">{tool.category}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Inputs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Input Parameters</h3>
            {tool.fields?.map(field => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label} {field.unit && `(${field.unit})`}</label>
                <div className="relative">
                   <input
                    type="number"
                    value={inputs[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900"
                    placeholder="Enter value"
                  />
                  {field.unit && <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">{field.unit}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Outputs */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Estimation Results</h3>
            <div className="space-y-4">
              {Object.entries(results).map(([key, val]) => (
                <div key={key} className="flex flex-col pb-3 border-b border-slate-200 last:border-0">
                  <span className="text-xs font-semibold text-slate-500 mb-1">{key}</span>
                  <span className="text-lg font-bold text-slate-800">{val}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorUI;
