import React from 'react';
import { useTokenData } from '../hooks/useTokenData';

const StatisticsSection = () => {
  const { tokenInfo, loading, error } = useTokenData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const stats = [
    { label: 'Market Cap', value: `$${tokenInfo.market_cap.toLocaleString()}` },
    { label: 'Daily Volume', value: `$${tokenInfo.volume_24h.toLocaleString()}` },
    { label: 'Circulating Supply', value: tokenInfo.circulating_supply.toLocaleString() },
  ];

  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center text-teal-400">
          Key Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-xl p-6 text-center transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-semibold mb-2 text-teal-300">{stat.label}</h4>
              <p className="text-3xl font-bold text-teal-400">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;