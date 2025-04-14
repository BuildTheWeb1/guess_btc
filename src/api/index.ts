export interface BtcPriceResponse {
	bitcoin: {
		usd: number;
	};
}

// Use environment variable for API URL in production, fallback to localhost for development
const API_BASE_URL =
	process.env.REACT_APP_API_URL || "http://localhost:5001/api";

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
