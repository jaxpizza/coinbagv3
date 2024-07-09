import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="text-teal-300">
          Data provided by <a href="https://coinmarketcap.com/" className="underline hover:text-teal-100" target="_blank" rel="noopener noreferrer">CoinMarketCap</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;