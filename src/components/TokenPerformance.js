import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTokenData } from '../hooks/useTokenData';

const TokenPerformance = () => {
  const { tokenInfo, loading, error } = useTokenData();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (tokenInfo) {
      const newDataPoint = { name: new Date().toLocaleTimeString(), value: tokenInfo.price };
      setChartData(prevData => [...prevData.slice(-5), newDataPoint]);
    }
  }, [tokenInfo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-16 px-4 bg-gray-800">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center text-teal-400">Token Performance</h3>
        <div className="bg-gray-700 rounded-lg shadow-xl p-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="name" stroke="#4FD1C5" />
              <YAxis stroke="#4FD1C5" />
              <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
              <Line type="monotone" dataKey="value" stroke="#4FD1C5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default TokenPerformance;