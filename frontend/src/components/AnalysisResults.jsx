import React from 'react';

export default function AnalysisResults({ result, isAnalyzing, onParaphrase, isParaphrasing, paraphrasedText }) {
  if (!result && !isAnalyzing) return null;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      {isAnalyzing ? (
        <div className="bg-slate-800 border border-slate-700 rounded-md p-8 flex flex-col items-center justify-center gap-4 text-slate-400 shadow-sm">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium text-blue-400">Processing document...</p>
        </div>
      ) : result ? (
        <div className="bg-slate-900 border border-slate-700 rounded-md overflow-hidden shadow-sm">
          {/* Header */}
          <div className={`p-5 border-b flex items-center justify-between ${result.is_watermarked ? 'border-red-900/50 bg-red-950/20' : 'border-emerald-900/50 bg-emerald-950/20'}`}>
            <h3 className="text-lg font-bold flex items-center gap-2">
              {result.is_watermarked ? (
                <span className="text-red-500 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  AI Generation Detected
                </span>
              ) : (
                <span className="text-emerald-500 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Human Written
                </span>
              )}
            </h3>
          </div>

          {/* Stats Grid */}
          <div className="p-5 grid grid-cols-3 gap-4 border-b border-slate-800">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Probability</span>
              <span className="text-2xl font-bold text-slate-100">{(result.probability * 100).toFixed(1)}%</span>
            </div>
            <div className="flex flex-col border-l border-slate-800 pl-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Perplexity</span>
              <span className="text-2xl font-bold text-slate-100">{result.perplexity.toFixed(1)}</span>
            </div>
            <div className="flex flex-col border-l border-slate-800 pl-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Burstiness</span>
              <span className="text-2xl font-bold text-slate-100">{result.burstiness.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="p-5 bg-slate-800/50">
             <p className="text-sm text-slate-400 leading-relaxed mb-4">{result.message}</p>
             <button 
                onClick={onParaphrase}
                disabled={isParaphrasing || paraphrasedText}
                className={`w-full py-3 rounded text-sm font-semibold transition-colors flex justify-center items-center gap-2
                  ${paraphrasedText 
                    ? 'bg-emerald-900/30 text-emerald-500 border border-emerald-800 cursor-default' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-500'
                  } disabled:opacity-70`}
              >
                {isParaphrasing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Restructuring Document...
                  </>
                ) : paraphrasedText ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Document Restructured
                  </>
                ) : (
                  <>
                    {result.is_watermarked ? 'Humanize & Remove Traces' : 'Force Restructure'}
                  </>
                )}
              </button>
          </div>
        </div>
      ) : null}

      {/* Paraphrased Result */}
      {paraphrasedText && (
        <div className="bg-slate-900 border border-slate-700 rounded-md overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="font-semibold text-slate-100">Restructured Output</h3>
          </div>
          <div className="p-5 text-slate-300 leading-relaxed whitespace-pre-wrap font-sans text-sm">
            {paraphrasedText}
          </div>
        </div>
      )}
    </div>
  );
}
