import React from 'react';

function HeroSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 text-teal-400">
          Revolutionize Your Investments with CoinBag
        </h2>
        <p className="text-xl text-teal-200 mb-8 max-w-2xl mx-auto">
          Unlock the power of blockchain technology and experience unparalleled financial freedom with CoinBag.
        </p>
        <button className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-400 transition duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default HeroSection;