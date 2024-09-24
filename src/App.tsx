import { graphqlOperation } from "@aws-amplify/api-graphql";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchBTCPrice } from "./api";
import {
  AddNewPlayer,
  AppFooter,
  BTCPrice,
  Character,
  ChatBox,
  CountdownTimer,
  GuessForm,
  Loader,
  Score,
  SelectPlayer,
} from "./components";
import { updatePlayers } from "./graphql/mutations";
import { listPlayers } from "./graphql/queries";
import { GuessResultType, GuessType, PlayerType } from "./types";
import { loadFromLocalStorage, queryClient, saveToLocalStorage } from "./utils";

function App() {
  const [currentBtcPrice, setCurrentBtcPrice] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [guess, setGuess] = useState<GuessType | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [guessResult, setGuessResult] = useState<GuessResultType | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
  const [players, setPlayers] = useState<PlayerType[]>([]);

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

  const fetchPlayers = useCallback(async () => {
    try {
      const result = await queryClient.graphql({
        query: listPlayers,
      });

      const playersData = result.data?.listPlayers?.items as PlayerType[];
      setPlayers(playersData);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  }, []);

  const updatePlayerScore = useCallback(async () => {
    if (currentPlayer) {
      try {
        await queryClient.graphql(
          graphqlOperation(updatePlayers, {
            input: {
              id: currentPlayer.id,
              score,
            },
          })
        );
        console.log("Score updated for player:", currentPlayer.name);
      } catch (error) {
        console.error("Failed to update player score:", error);
      }
    }
  }, [currentPlayer, score]);

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
    [currentBtcPrice, resolveGuess]
  );

  const handlePlayerSelect = useCallback((player: PlayerType) => {
    setCurrentPlayer(player);
    setScore(player.score);
    setGuess(null);
    setGuessResult(null);
  }, []);

  const handleNewPlayerCreate = useCallback(
    (newPlayer: PlayerType) => {
      setCurrentPlayer(newPlayer);
      setScore(0);
      fetchPlayers();
    },
    [fetchPlayers]
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

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    if (currentPlayer) {
      saveToLocalStorage("currentPlayer", currentPlayer);
      saveToLocalStorage("score", score);
    }
  }, [currentPlayer, score]);

  useEffect(() => {
    const savedPlayer = loadFromLocalStorage("currentPlayer");
    const savedScore = loadFromLocalStorage("score");

    if (savedPlayer) {
      setCurrentPlayer(savedPlayer);
      setScore(savedScore ?? 0);
    }
  }, []);

  useEffect(() => {
    if (currentPlayer && currentPlayer.score !== score) {
      updatePlayerScore();
    }
  }, [score, currentPlayer, updatePlayerScore]);

  if (currentBtcPrice === null) return <Loader />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e8f5e9",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          px: 4,
        }}
      >
        <Grid container spacing={6} justifyContent="center" maxWidth={1400}>
          <Grid item xs={12} md={5}>
            <Typography
              variant="h1"
              fontSize={{ xs: "3rem", sm: "3.5rem", md: "4rem" }}
              fontWeight="bold"
            >
              BTC - Guess The Price
            </Typography>
            <Box mt={6}>
              <Typography fontSize="1.5rem" gutterBottom>
                Pick your guess! Is the price going UP or DOWN?
              </Typography>
              <Box mt={4}>
                {isWaiting ? (
                  <CountdownTimer milliseconds={60000} />
                ) : (
                  <GuessForm
                    player={currentPlayer}
                    onSubmitGuess={handleGuessSubmit}
                  />
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card sx={{ mb: 4, padding: 2, borderRadius: "0.75rem" }}>
              <CardContent>
                <BTCPrice price={currentBtcPrice} />
              </CardContent>
            </Card>

            <Card
              sx={{
                backgroundColor: "#26453F",
                padding: 2,
                borderRadius: "0.75rem",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={{ xs: "column", sm: "row" }}
                  gap={4}
                  mb={4}
                >
                  <AddNewPlayer
                    onCreate={handleNewPlayerCreate}
                    isDisabled={isWaiting}
                  />
                  <SelectPlayer
                    players={players}
                    currentPlayer={currentPlayer}
                    onSelect={handlePlayerSelect}
                    isDisabled={isWaiting}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection={{
                    xs: "column",
                    sm: "row",
                    md: "column",
                    lg: "row",
                  }}
                >
                  <Box>
                    <Score score={score} />
                    <ChatBox guess={guess} guessResult={guessResult} />
                  </Box>
                  <Box>
                    <Character guessResult={guessResult} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <AppFooter />
    </Box>
  );
}

export default App;
