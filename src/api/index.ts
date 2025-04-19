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

export const fetchBTCPrice = async (): Promise<number> => {
	try {
		const response = await fetch(`${API_BASE_URL}/btc-price`);
		const data: BtcPriceResponse = await response.json();
		return data.bitcoin.usd;
	} catch (error) {
		console.error("Error fetching BTC price:", error);
		throw error;
	}
};
