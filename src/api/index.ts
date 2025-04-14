// src/api/index.ts
export interface BtcPriceResponse {
  bitcoin: {
    usd: number;
  };
}

const API_BASE_URL = "http://localhost:5001/api";

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
