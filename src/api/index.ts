export interface BtcPriceResponse {
	bitcoin: {
		usd: number;
	};
}

// Determine API base URL based on environment
const API_BASE_URL = (() => {
	// In production on Vercel, API routes are served from the same domain
	if (process.env.NODE_ENV === 'production') {
		return '/api';
	}
	// For local development
	return process.env.REACT_APP_API_URL || "http://localhost:5001/api";
})();

// Keep track of the last price to detect small changes
let lastPrice: number | null = null;
// Track consecutive unchanged prices
let unchangedCount = 0;
// Maximum consecutive unchanged prices before adding micro-fluctuations
const MAX_UNCHANGED = 2;

export const fetchBTCPrice = async (): Promise<number> => {
	try {
		const response = await fetch(`${API_BASE_URL}/btc-price`);
		const data: BtcPriceResponse = await response.json();
		const currentPrice = data.bitcoin.usd;
		
		// If we have a previous price, check if it's the same
		if (lastPrice !== null && Math.abs(currentPrice - lastPrice) < 0.01) {
			unchangedCount++;
		} else {
			unchangedCount = 0;
		}
		
		// Store the current price for next comparison
		lastPrice = currentPrice;
		
		// If price hasn't changed for several checks, add micro-fluctuations
		// to make the game more engaging
		if (unchangedCount >= MAX_UNCHANGED) {
			// Generate a small random fluctuation (±0.01% to ±0.1% of the price)
			const fluctuation = currentPrice * (Math.random() * 0.001 + 0.0001) * (Math.random() > 0.5 ? 1 : -1);
			
			// Apply the fluctuation and return with 2 decimal places precision
			return Number((currentPrice + fluctuation).toFixed(2));
		}
		
		// Return the actual price with 2 decimal places precision
		return Number(currentPrice.toFixed(2));
	} catch (error) {
		console.error("Error fetching BTC price:", error);
		
		// If we have a last price and there's an error, return a slightly modified version
		// to keep the game going even during API issues
		if (lastPrice !== null) {
			const fluctuation = lastPrice * (Math.random() * 0.002 + 0.0001) * (Math.random() > 0.5 ? 1 : -1);
			return Number((lastPrice + fluctuation).toFixed(2));
		}
		
		throw error;
	}
};
