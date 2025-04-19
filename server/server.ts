import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'node:path';

const app = express();
const PORT = process.env.PORT || 5001;

// Cache variables
interface BtcPriceCache {
  bitcoin: {
    usd: number;
  };
  timestamp: number;
}

let priceCache: BtcPriceCache | null = null;
const CACHE_TTL = 5000; // Cache time-to-live in milliseconds (5 seconds)

// Middleware
app.use(cors());
app.use(express.json());

// Route to proxy the CoinGecko API with caching
app.get('/api/btc-price', async (req, res) => {
  const now = Date.now();
  
  // Return cached price if it's still fresh
  if (priceCache && now - priceCache.timestamp < CACHE_TTL) {
    console.log('Serving cached BTC price data');
    // Return only the bitcoin price data without the timestamp
    const { timestamp, ...cachedData } = priceCache;
    return res.json(cachedData);
  }
  
  try {
    console.log('Fetching fresh BTC price data from CoinGecko');
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    
    // Update cache with timestamp
    priceCache = {
      ...response.data,
      timestamp: now
    };
    
    // Return only the bitcoin price data without the timestamp
    if (priceCache) {
      const { timestamp: _, ...responseData } = priceCache;
      res.json(responseData);
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch BTC price data',
        message: 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    
    // If we have cached data, return it even if expired in case of API failure
    if (priceCache) {
      console.log('Returning stale cache due to API error');
      const { timestamp, ...cachedData } = priceCache;
      return res.json(cachedData);
    }
    
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
