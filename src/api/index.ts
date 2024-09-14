// src/api.ts
export interface BtcPriceResponse {
  bitcoin: {
    usd: number;
  };
}

export const fetchBTCPrice = async (): Promise<number> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );
  const data: BtcPriceResponse = await response.json();
  return data.bitcoin.usd;
};
