import { Box, Card, CardContent, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchBTCPrice } from "./api";
import {
  BTCPrice,
  ChatBox,
  CountdownTimer,
  GuessForm,
  Loader,
  Score,
} from "./components";
import { GuessResultType, GuessType } from "./types";

function App() {
  const [currentBtcPrice, setCurrentBtcPrice] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [guess, setGuess] = useState<GuessType | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [guessResult, setGuessResult] = useState<GuessResultType | null>(null);

  const startPriceRef = useRef<number | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      const price = await fetchBTCPrice();
      if (price !== null) {
        setCurrentBtcPrice(price);
      } else {
        console.error("Error fetching BTC price");
      }
    } catch (error) {
      console.error("Failed to fetch BTC price:", error);
    }
  }, []);

  const resolveGuess = useCallback(async () => {
    const startPrice = startPriceRef.current;

    const newPrice = await fetchBTCPrice();
    if (newPrice === null) {
      setWaiting(false);
      return;
    }

    if (startPrice !== null && newPrice === startPrice) {
      setGuessResult(GuessResultType.NEUTRAL);
      setWaiting(false);
      return;
    }

    if (
      startPrice !== null &&
      ((guess === GuessType.UP && newPrice > startPrice) ||
        (guess === GuessType.DOWN && newPrice < startPrice))
    ) {
      setScore((prev) => Math.max(0, prev + 1));
      setGuessResult(GuessResultType.CORRECT);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      setGuessResult(GuessResultType.INCORRECT);
    }

    setCurrentBtcPrice(newPrice);
    setGuess(null);
    setWaiting(false);
  }, [guess]);

  const handleGuessSubmit = useCallback(
    (guess: GuessType) => {
      startPriceRef.current = currentBtcPrice;
      setGuess(guess);
      setWaiting(true);
      setGuessResult(null);

      setTimeout(() => resolveGuess(), 30000);
    },
    [resolveGuess, currentBtcPrice]
  );

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  if (currentBtcPrice === null) return <Loader />;

  return (
    <Box m={4}>
      <Card>
        <CardContent>
          <Typography variant="h1" textAlign="center" gutterBottom>
            BTC - Guess The Price
          </Typography>
          <Box display="flex" justifyContent="space-evenly">
            <Score score={score} />
            <BTCPrice price={currentBtcPrice} />
          </Box>
          <Box mt={8} display="flex" justifyContent="center">
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Is the price going UP or DOWN?
              </Typography>
              {waiting ? (
                <CountdownTimer milliseconds={30000} />
              ) : (
                <GuessForm onSubmitGuess={handleGuessSubmit} />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ChatBox guess={guess} guessResult={guessResult} />
    </Box>
  );
}

export default App;
