import React from 'react';

export default function Faq() {
  const faqs = [
    {
      q: 'Does Claude actually use a hidden watermark?',
      a: 'Anthropic (the creator of Claude) has experimented with cryptographic watermarking, but currently, AI detectors rely on statistical anomalies rather than a literal "stamp." Our tool detects these anomalies—specifically the predictable patterns (low perplexity) that Claude inherently produces.'
    },
    {
      q: 'How does the Claude Watermark Remover work?',
      a: 'Our remover doesn\'t just spin words. It analyzes the text for low-burstiness sections and artificially restructures the syntax. By injecting human-like variance into sentence lengths and vocabulary, the text evades standard AI detection algorithms.'
    },
    {
      q: 'Is this tool free to use?',
      a: 'Yes, our core AI text analysis and basic watermark removal features are currently available for free.'
    },
    {
      q: 'Is my text saved on your servers?',
      a: 'Absolutely not. We utilize a highly advanced, browser-based analysis engine. Your text is processed locally on your own device and is never stored or transmitted to external servers.'
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-panel p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-3">{faq.q}</h3>
            <p className="text-gray-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
