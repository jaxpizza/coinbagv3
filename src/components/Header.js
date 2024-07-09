import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-400">CoinBag</h1>
        <nav>
          <Link to="/" className="mx-2 text-teal-300 hover:text-teal-100">Home</Link>
          <Link to="/blog" className="mx-2 text-teal-300 hover:text-teal-100">Blog</Link>
          <Link to="/socials" className="mx-2 text-teal-300 hover:text-teal-100">Socials</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;