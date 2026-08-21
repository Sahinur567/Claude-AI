import React from 'react';

export default function Legal({ type }) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      text: 'Your privacy is our primary concern. Because our detection and restructuring algorithms run completely client-side (in your browser), we do not collect, transmit, or store any of the text you analyze using our tools. We do utilize standard analytics (like Google Analytics) to monitor website traffic and performance, but your document content remains strictly on your device.'
    },
    terms: {
      title: 'Terms of Service',
      text: 'By accessing and using this website, you agree to be bound by these Terms of Service. Our tools are provided "as is" without warranty of any kind. You agree not to use our tool for illegal purposes. We reserve the right to modify or terminate the service at any time without notice.'
    },
    disclaimer: {
      title: 'Disclaimer',
      text: 'The AI Watermark Detector and Remover is a statistical simulation tool designed for educational and analytical purposes. While it utilizes advanced metrics like perplexity and burstiness, no AI detection tool is 100% accurate. We do not guarantee the absolute accuracy of the detection results, nor do we endorse using the removal tool to violate academic integrity policies.'
    }
  };

  const current = content[type];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="glass-panel p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 border-b border-gray-800 pb-4">
          {current.title}
        </h1>
        <p className="text-gray-400 leading-relaxed">
          {current.text}
        </p>
        <p className="text-sm text-gray-600 mt-12">
          Last updated: August 2026
        </p>
      </div>
    </div>
  );
}
