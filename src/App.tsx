import { useEffect, useState } from "react";
import { fetchBTCPrice } from "./api";
import { Box, Typography } from "@mui/material";

function App() {
  const [currentBtcPrice, setCurrentBtcPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchBTCPrice();
      setCurrentBtcPrice(price);
    };
    fetchPrice();
  }, []);

  return (
    <Box m={4}>
      <Typography variant="h1" gutterBottom>
        BTC Guessing Game
      </Typography>
      The current <code>BTC price is: </code>
      {currentBtcPrice}€
    </Box>
  );
}

export default App;
