import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import Faq from './pages/Faq';
import Blog from './pages/Blog';
import About from './pages/About';
import Legal from './pages/Legal';
import DynamicLandingPage from './pages/DynamicLandingPage';
import DynamicBlog from './pages/DynamicBlog';
import Widget from './pages/Widget';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="claude-watermark-remover" element={<LandingPage type="remover" />} />
          <Route path="claude-watermark-detector" element={<LandingPage type="detector" />} />
          
          {/* Programmatic SEO routes */}
          <Route path="tool/:slug" element={<DynamicLandingPage />} />

          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="features" element={<Features />} />
          <Route path="faq" element={<Faq />} />
          <Route path="blog" element={<Blog />} />
          <Route path="post/:slug" element={<DynamicBlog />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<Legal type="privacy" />} />
          <Route path="terms-of-service" element={<Legal type="terms" />} />
          <Route path="disclaimer" element={<Legal type="disclaimer" />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/widget" element={<Widget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
