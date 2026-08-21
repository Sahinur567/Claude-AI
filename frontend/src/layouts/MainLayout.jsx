import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Claude</span>
              <span className="text-gray-100 ml-1.5">Watermark</span>
              <span className="text-gray-400 font-medium ml-1.5 hidden sm:inline-block">Remover</span>
            </span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-gray-400">
            <Link to="/claude-watermark-detector" className="hover:text-indigo-400 transition-colors">Detector</Link>
            <Link to="/how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</Link>
            <Link to="/features" className="hover:text-indigo-400 transition-colors">Features</Link>
            <Link to="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-gray-800 bg-gray-900 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Claude AI Watermark Remover</h3>
            <p className="text-sm text-gray-500">
              The most advanced Claude AI watermark detector and removal tool available online.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-indigo-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-600 mt-12">
          &copy; {new Date().getFullYear()} AI Watermark Tools. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
