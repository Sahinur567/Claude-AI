import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';

const DynamicBlog = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/blogs/${slug}.md`);
        if (!res.ok) throw new Error('Blog not found');
        const text = await res.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12 text-center text-red-500">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-blue-400 hover:underline">Return to Blog</Link>
      </div>
    );
  }

  // Extract title from markdown for helmet
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : 'Blog Post | AI Watermark Remover';
  
  // Extract date from markdown
  const dateMatch = content.match(/\*Published on:\s+([^*]+)\*/);
  const publishedDate = dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString();
  
  // Create JSON-LD Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": "https://claudewatermarkremover.space/social-preview.png",
    "author": {
      "@type": "Organization",
      "name": "AI Watermark Tools",
      "url": "https://claudewatermarkremover.space/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Watermark Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://claudewatermarkremover.space/icon.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://claudewatermarkremover.space/post/${slug}`
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Read about ${title} and AI watermark removal.`} />
        <link rel="canonical" href={`https://claudewatermarkremover.space/post/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <article className="prose prose-invert prose-blue lg:prose-xl mx-auto bg-gray-800/30 p-8 rounded-2xl shadow-xl border border-gray-700/50">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
      
      <div className="mt-12 text-center">
        <Link to="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Back to all posts
        </Link>
      </div>
    </div>
  );
};

export default DynamicBlog;
