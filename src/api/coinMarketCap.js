import axios from 'axios';

const API_KEY = process.env.REACT_APP_CMC_API_KEY;
const TOKEN_ID = '31798'; // UCID for JENNER token

export const fetchTokenData = async () => {
  try {
    const response = await axios.get('/v2/cryptocurrency/quotes/latest', {
      params: { id: TOKEN_ID },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      }
    });
    
    if (response.data.status.error_code !== 0) {
      throw new Error(response.data.status.error_message);
    }
    
    return response.data.data[TOKEN_ID];
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
};