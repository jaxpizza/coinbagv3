import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Menu, X } from 'lucide-react';
import BlogPage from './BlogPage';
import SocialsDropdown from './SocialsDropdown';
import Header from './components/Header';

const API_KEY = process.env.REACT_APP_CMC_API_KEY;
const TOKEN_ID = '31798'; // UCID for JENNER token

const HomePage = () => {
  const [priceChartData, setPriceChartData] = useState([]);
  const [volumeChartData, setVolumeChartData] = useState([]);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEMA, setShowEMA] = useState(false);

  const fetchLiveData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
        params: { id: TOKEN_ID },
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY,
        }
      });

      if (response.data.status.error_code !== 0) {
        throw new Error(response.data.status.error_message);
      }

      const tokenData = response.data.data[TOKEN_ID];
      setTokenInfo(tokenData);

      const mockHistoricalData = generateMockHistoricalData(tokenData.quote.USD.price, 30);
      setPriceChartData(mockHistoricalData.priceData);
      setVolumeChartData(mockHistoricalData.volumeData);

    } catch (error) {
      console.error('Error fetching live data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 300000); // Fetch new data every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const generateMockHistoricalData = (currentPrice, days) => {
    const priceData = [];
    const volumeData = [];
    const baseVolume = 1000000;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString();
      const price = currentPrice * (1 + (Math.random() - 0.5) * 0.1);
      const volume = baseVolume * (0.5 + Math.random());

      priceData.push({ date, price });
      volumeData.push({ date, volume });
    }

    return { priceData, volumeData };
  };

  const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let ema = data[0].price;
    return data.map((item, i) => {
      if (i === 0) return { ...item, ema };
      ema = (item.price * k) + (ema * (1 - k));
      return { ...item, ema };
    });
  };

  const dataWithEMA = showEMA ? calculateEMA(calculateEMA(priceChartData, 113), 120) : priceChartData;

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-teal-400 glow">
            Revolutionize Your Investments with Jenner Token
          </h2>
          <p className="text-xl text-teal-200 mb-2 max-w-2xl mx-auto">
            Unlock the power of blockchain technology and experience unparalleled financial freedom with Jenner Token.
          </p>
          <p className="text-sm text-teal-300 mb-8">
            CA: 0x482702745260ffd69fc19943f70cffe2cacd70e9
          </p>
          <button className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-400 transition duration-300 transform hover:scale-105 glow">
            Get Started
          </button>
        </div>
      </section>

      {loading ? (
        <div className="text-center text-teal-400 my-10">Loading data...</div>
      ) : error ? (
        <div className="text-center text-red-400 my-10">{error}</div>
      ) : (
        <>
          {/* Current Price and 24h Change */}
          <section className="py-8 px-4 bg-gray-800">
            <div className="container mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4 text-teal-400 glow">JENNER Token</h3>
              <p className="text-2xl font-bold text-teal-300">
                Current Price: ${tokenInfo.quote.USD.price.toFixed(6)}
                <span className={`ml-4 ${tokenInfo.quote.USD.percent_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {tokenInfo.quote.USD.percent_change_24h.toFixed(2)}% (24h)
                </span>
              </p>
            </div>
          </section>

          {/* Price Chart Section */}
          <section className="py-16 px-4 bg-gray-800" id="charts">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold mb-8 text-center text-teal-400 glow">
                JENNER Token Price (Last 30 Days)
              </h3>
              <div className="mb-4">
                <button 
                  onClick={() => setShowEMA(!showEMA)} 
                  className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-400 transition duration-300"
                >
                  {showEMA ? 'Hide EMA' : 'Show EMA (113 & 120)'}
                </button>
              </div>
              <div className="bg-gray-700 rounded-lg shadow-xl p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dataWithEMA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                    <XAxis dataKey="date" stroke="#4FD1C5" />
                    <YAxis stroke="#4FD1C5" domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ background: '#1A202C', border: 'none', boxShadow: '0 0 10px rgba(79, 209, 197, 0.3)' }} />
                    <Line type="monotone" dataKey="price" stroke="#4FD1C5" strokeWidth={2} dot={false} />
                    {showEMA && (
                      <>
                        <Line type="monotone" dataKey="ema" stroke="#FF69B4" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="ema" stroke="#FFA500" strokeWidth={1} dot={false} />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Volume Chart Section */}
          <section className="py-16 px-4 bg-gray-900" id="volume-chart">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold mb-8 text-center text-teal-400 glow">
                JENNER Token Daily Volume (Last 30 Days)
              </h3>
              <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={volumeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                    <XAxis dataKey="date" stroke="#4FD1C5" />
                    <YAxis stroke="#4FD1C5" />
                    <Tooltip contentStyle={{ background: '#1A202C', border: 'none', boxShadow: '0 0 10px rgba(79, 209, 197, 0.3)' }} />
                    <Bar dataKey="volume" fill="#4FD1C5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 px-4 bg-gray-800" id="statistics">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold mb-8 text-center text-teal-400 glow">
                Key Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Market Cap', value: tokenInfo ? `$${tokenInfo.quote.USD.market_cap.toLocaleString()}` : 'N/A' },
                  { label: 'Daily Volume', value: tokenInfo ? `$${tokenInfo.quote.USD.volume_24h.toLocaleString()}` : 'N/A' },
                  { label: 'Circulating Supply', value: tokenInfo ? tokenInfo.circulating_supply.toLocaleString() : 'N/A' },
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg shadow-xl p-6 text-center">
                    <h4 className="text-xl font-semibold mb-2 text-teal-300">{stat.label}</h4>
                    <p className="text-3xl font-bold text-teal-400 glow">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-teal-300">
            Data provided by <a href="https://coinmarketcap.com/" className="underline hover:text-teal-100" target="_blank" rel="noopener noreferrer">CoinMarketCap</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
