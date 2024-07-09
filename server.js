const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.REACT_APP_CMC_API_KEY;
const TOKEN_ID = '31798'; // UCID for JENNER token

app.get('/api/cryptocurrency/quotes/latest', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
      params: { id: TOKEN_ID },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
