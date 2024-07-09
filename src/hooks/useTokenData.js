import { useState, useEffect } from 'react';
import { fetchTokenData } from '../api/coinMarketCap';

export const useTokenData = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTokenData();
        setTokenInfo({
          price: data.quote.USD.price,
          percent_change_24h: data.quote.USD.percent_change_24h,
          market_cap: data.quote.USD.market_cap,
          volume_24h: data.quote.USD.volume_24h,
          circulating_supply: data.circulating_supply,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Fetch new data every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return { tokenInfo, loading, error };
};