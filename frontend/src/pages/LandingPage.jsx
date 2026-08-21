import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage({ type }) {
  const isDetector = type === 'detector';
  
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center animate-in fade-in duration-300">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        {isDetector ? 'Enterprise AI Watermark Detector' : 'Advanced Claude Watermark Remover'}
      </h1>
      
      <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        {isDetector 
          ? 'Instantly analyze any document to uncover hidden statistical signatures and perplexity patterns left behind by Large Language Models.'
          : 'Bypass AI detection algorithms effortlessly. Our restructuring engine injects human variance to completely remove AI generation patterns.'}
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-md p-8 mb-12 text-left shadow-sm">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          Why Choose Our {isDetector ? 'Detection' : 'Removal'} Technology?
        </h2>
        <ul className="list-disc list-inside space-y-3 text-slate-400 font-medium">
          <li>Unprecedented accuracy based on burstiness and perplexity mapping.</li>
          <li>100% client-side processing guarantees your privacy.</li>
          <li>Designed specifically to target the nuanced writing style of Claude AI.</li>
        </ul>
      </div>

      <Link to="/" className="inline-block primary-button text-lg px-8 py-4">
        Launch the Tool Now
      </Link>
    </div>
  );
}
