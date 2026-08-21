import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/blogs/blog_index.json');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Error loading blog index:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          AI Detection Insights
        </h1>
        <p className="text-lg text-slate-400">
          Stay updated on the latest in AI watermarking, detection algorithms, and LLM behavior.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link to={`/post/${post.slug}`} key={post.slug} className="bg-slate-900 border border-slate-700 rounded-md overflow-hidden flex flex-col hover:border-blue-500/50 transition-colors shadow-sm group">
              <div className="h-40 w-full relative overflow-hidden bg-slate-800 border-b border-slate-700 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-600 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              </div>
              <div className="p-6 flex-grow relative z-10 flex flex-col">
                <span className="text-xs font-semibold text-blue-500 tracking-wider uppercase mb-2 block">{post.date}</span>
                <h3 className="text-xl font-bold text-slate-100 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400 flex items-center gap-1">Read Report <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
