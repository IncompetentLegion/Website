
/**
 * EXAMPLE PROXY SERVER (Node.js + Express)
 * This should be run on your backend environment.
 * Do not include this in your client-side React bundle.
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MSS_TOKEN = process.env.MSS_ACCESS_TOKEN; // Set this in your .env file

app.use(cors());

// Proxy all requests to MySquadStats
app.get('/api/mss/*', async (req, res) => {
  try {
    const path = req.params[0];
    const response = await axios.get(`https://api.mysquadstats.com/${path}`, {
      params: {
        ...req.query,
        accessToken: MSS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('MSS Proxy Error:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Proxy request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
