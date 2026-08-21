import React from 'react';

export default function About() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="glass-panel p-8 md:p-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-8">
          About Us
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-lg leading-relaxed">
            As Artificial Intelligence becomes deeply integrated into content creation, the line between human and machine authorship has blurred. Our mission is to restore transparency and provide users with the most advanced Claude AI watermark detector and removal suite available today.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-100 mt-8 mb-4">Why We Built This</h3>
          <p>
            The rapid deployment of models like Claude 3.5 and ChatGPT brought incredible efficiency, but also new challenges for educators, editors, and webmasters. We realized that traditional "AI scanners" were falling behind, relying on outdated keyword matching. We built this platform from the ground up to analyze the fundamental statistical physics of language—specifically perplexity and burstiness.
          </p>

          <h3 className="text-2xl font-bold text-gray-100 mt-8 mb-4">Our Technology</h3>
          <p>
            Unlike competitors that send your private documents to third-party servers, our proprietary heuristic engine runs entirely in the client environment. This zero-trust architecture ensures that when you use our Claude Watermark Remover, your data remains 100% confidential.
          </p>
        </div>
      </div>
    </div>
  );
}
