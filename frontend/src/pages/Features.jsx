import React from 'react';

export default function Features() {
  const features = [
    {
      title: 'Advanced Heuristic Scanning',
      description: 'Go beyond simple keyword matching. Our tool analyzes the fundamental statistical likelihood of word pairings to detect the invisible signatures left by Claude and ChatGPT.'
    },
    {
      title: 'Perplexity & Burstiness Metrics',
      description: 'Get deep insights into your text. See exactly why a document is flagged by viewing its perplexity (predictability) and burstiness (structural variance) scores.'
    },
    {
      title: 'Instant Claude Watermark Removal',
      description: 'Don\'t just detect it—fix it. Our one-click restructuring engine injects human-like variance into your text, effectively bypassing aggressive AI detectors.'
    },
    {
      title: '100% Privacy Focused',
      description: 'Your data never leaves your browser. All analysis is performed locally, ensuring your sensitive documents and essays remain completely confidential.'
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
          Unmatched Features for AI Detection
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          The most robust tool suite for identifying and removing AI generation signatures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="glass-panel p-8 hover:border-indigo-500/50 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
