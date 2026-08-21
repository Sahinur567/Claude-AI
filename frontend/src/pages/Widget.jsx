import React, { useState } from 'react';

const Widget = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text) return;
    setLoading(true);
    // Simulate API call for the widget
    setTimeout(() => {
      setResult({
        probability: Math.random() * 100,
        is_watermarked: Math.random() > 0.5,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-md p-5 shadow-sm flex flex-col h-full max-h-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            AI Detector
          </h2>
          <a href="https://claudewatermarkremover.space" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
            Powered by ClaudeWatermarkRemover
          </a>
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste document text here..."
          className="w-full h-32 bg-slate-800 border border-slate-700 rounded text-slate-200 text-sm focus:outline-none focus:border-blue-500 mb-4 resize-none p-3 shadow-sm"
        />
        
        <button
          onClick={analyze}
          disabled={loading || !text}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Scan Document'}
        </button>
        
        {result && (
          <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm font-medium">AI Generation Probability:</span>
              <span className={`font-bold ${result.is_watermarked ? 'text-red-500' : 'text-emerald-500'}`}>
                {result.probability.toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
