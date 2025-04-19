import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'node:path';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Route to proxy the CoinGecko API
app.get('/api/btc-price', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    res.status(500).json({ 
      error: 'Failed to fetch BTC price data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// In production, the server might be handling static files too
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app build directory
  const staticPath = path.join(__dirname, '../../build');
  app.use(express.static(staticPath));

  // Handle any requests that don't match the ones above
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
