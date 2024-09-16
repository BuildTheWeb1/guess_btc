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
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [guessResult, setGuessResult] = useState<GuessResultType | null>(null);

  const startPriceRef = useRef<number | null>(null);
  const guessTimeRef = useRef<number | null>(null);
  const hasPriceChangedRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const resolveGuess = useCallback(() => {
    const startPrice = startPriceRef.current;

    if (currentBtcPrice === null || startPrice === null) return;

    if (
      (guess === GuessType.UP && currentBtcPrice > startPrice) ||
      (guess === GuessType.DOWN && currentBtcPrice < startPrice)
    ) {
      setScore((prev) => Math.max(0, prev + 1));
      setGuessResult(GuessResultType.CORRECT);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      setGuessResult(GuessResultType.INCORRECT);
    }

    setGuess(null);
    setIsWaiting(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [currentBtcPrice, guess]);

  const handleGuessSubmit = useCallback(
    (guess: GuessType) => {
      startPriceRef.current = currentBtcPrice;
      guessTimeRef.current = Date.now();
      hasPriceChangedRef.current = false;
      setGuess(guess);
      setIsWaiting(true);
      setGuessResult(null);

      timeoutRef.current = setTimeout(() => {
        if (hasPriceChangedRef.current) {
          resolveGuess();
        }
      }, 60000);
    },
    [resolveGuess, currentBtcPrice]
  );

  useEffect(() => {
    if (
      isWaiting &&
      startPriceRef.current &&
      currentBtcPrice !== startPriceRef.current
    ) {
      hasPriceChangedRef.current = true;

      if (Date.now() - (guessTimeRef.current || 0) >= 60000) {
        resolveGuess();
      }
    }
  }, [currentBtcPrice, isWaiting, resolveGuess]);

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 25000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  if (currentBtcPrice === null) return <Loader />;

  return (
    <Box m={4}>
      <Card>
        <CardContent>
          <Typography variant="h2" textAlign="center" gutterBottom>
            BTC - Guess The Price
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Score score={score} />
            <BTCPrice price={currentBtcPrice} />
          </Box>
          <Box mt={8} display="flex" justifyContent="center">
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Is the price going UP or DOWN?
              </Typography>
              {isWaiting ? (
                <CountdownTimer milliseconds={60000} />
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
