import React from 'react';

const BlogPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-teal-400 mb-8 text-center glow">Blog</h1>
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-teal-300 mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            We're working hard to bring you exciting content about Jenner Token and the world of cryptocurrency. 
            Check back soon for updates, insights, and news about our project!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;