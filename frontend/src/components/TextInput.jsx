import React from 'react';

export default function TextInput({ value, onChange, disabled }) {
  const maxLength = 100000;
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center px-1">
        <label htmlFor="text-input" className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
          Document Content
        </label>
        <span className={`text-xs font-medium ${value.length > maxLength * 0.9 ? 'text-red-400' : 'text-slate-500'}`}>
          {value.length.toLocaleString()} / {maxLength.toLocaleString()} chars
        </span>
      </div>
      
      <textarea
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter or paste text here to analyze..."
        className="w-full h-64 p-4 bg-slate-900 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y disabled:bg-slate-800 disabled:text-slate-500 font-sans shadow-sm"
        maxLength={maxLength}
      />
    </div>
  );
}
