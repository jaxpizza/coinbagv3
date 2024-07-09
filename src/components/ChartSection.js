import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const ChartSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-800">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center text-teal-400">
          Token Performance
        </h3>
        <div className="bg-gray-700 rounded-lg shadow-xl p-6 transform hover:scale-105 transition duration-300">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis dataKey="name" stroke="#4FD1C5" />
              <YAxis stroke="#4FD1C5" />
              <Tooltip contentStyle={{ background: '#1A202C', border: 'none', boxShadow: '0 0 10px rgba(79, 209, 197, 0.3)' }} />
              <Line type="monotone" dataKey="value" stroke="#4FD1C5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default ChartSection;