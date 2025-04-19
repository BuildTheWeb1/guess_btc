import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchBTCPrice } from "./api";
import {
	AppFooter,
	BTCPrice,
	Character,
	ChatBox,
	CountdownTimer,
	GuessForm,
	Loader,
	Score,
} from "./components";
import { GuessResultType, GuessType } from "./types";
import {
	colorPrimary,
	loadFromLocalStorage,
	saveToLocalStorage,
} from "./utils";

function App() {
	const [currentBtcPrice, setCurrentBtcPrice] = useState<number | null>(null);
	const [score, setScore] = useState<number>(0);
	const [guess, setGuess] = useState<GuessType | null>(null);
	const [isWaiting, setIsWaiting] = useState<boolean>(false);
	const [guessResult, setGuessResult] = useState<GuessResultType | null>(null);

	const startPriceRef = useRef<number | null>(null);
	const guessTimeRef = useRef<number | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const fetchPrice = useCallback(async () => {
		try {
			const price = await fetchBTCPrice();
			if (price !== null) {
				// Format price consistently to 2 decimal places
				const formattedPrice = Number(price.toFixed(2));
				setCurrentBtcPrice(formattedPrice);
				return formattedPrice; // Return the formatted price for use in resolveGuess
			}
			console.error("Error fetching BTC price");
			return null;
		} catch (error) {
			console.error("Failed to fetch BTC price:", error);
			return null;
		}
	}, []);

	const resolveGuess = useCallback(async () => {
		// Fetch the latest price to ensure we have the most up-to-date data
		const finalPrice = await fetchPrice();
		const startPrice = startPriceRef.current;

		console.log(`Resolving guess - Start price: ${startPrice}, Final price: ${finalPrice}`);

		if (finalPrice === null || startPrice === null) {
			console.error("Cannot resolve guess: missing price data");
			return;
		}

		// Use a small epsilon for floating point comparison to avoid precision issues
		const epsilon = 0.01; // 1 cent difference threshold
		const priceDifference = Math.abs(finalPrice - startPrice);
		
		// Determine the result
		if (priceDifference < epsilon) {
			console.log("Price unchanged (within threshold)");
			// No score change when price remains the same
			setGuessResult(GuessResultType.UNCHANGED);
		} else if (
			(guess === GuessType.UP && finalPrice > startPrice) ||
			(guess === GuessType.DOWN && finalPrice < startPrice)
		) {
			console.log(`Correct guess! Price moved ${finalPrice > startPrice ? 'up' : 'down'} by $${priceDifference.toFixed(2)}`);
			setScore((prev) => Math.max(0, prev + 1));
			setGuessResult(GuessResultType.CORRECT);
		} else {
			console.log(`Incorrect guess! Price moved ${finalPrice > startPrice ? 'up' : 'down'} by $${priceDifference.toFixed(2)}`);
			setScore((prev) => Math.max(0, prev - 1));
			setGuessResult(GuessResultType.INCORRECT);
		}

		// Reset state
		setGuess(null);
		setIsWaiting(false);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, [fetchPrice, guess]);

	const handleGuessSubmit = useCallback(
		(guess: GuessType) => {
			// Store the current price at the exact moment the guess is made
			if (currentBtcPrice === null) {
				console.error("Cannot make a guess: no current price available");
				return;
			}
			
			// Store the starting price with consistent formatting
			startPriceRef.current = Number(currentBtcPrice.toFixed(2));
			guessTimeRef.current = Date.now();
			
			console.log(`New guess: ${guess}, Starting price: ${startPriceRef.current}`);
			
			setGuess(guess);
			setIsWaiting(true);
			setGuessResult(null);

			// Set timeout to resolve the guess after the waiting period
			timeoutRef.current = setTimeout(() => {
				resolveGuess();
			}, 30000);
		},
		[currentBtcPrice, resolveGuess],
	);

	// Initial price fetch and polling setup
	useEffect(() => {
		fetchPrice();
		// Poll for price updates every 15 seconds
		const interval = setInterval(fetchPrice, 15000);
		return () => clearInterval(interval);
	}, [fetchPrice]);

	useEffect(() => {
		// Save score to localStorage
		saveToLocalStorage("score", score);
	}, [score]);

	useEffect(() => {
		// Load score from localStorage on initial load
		const savedScore = loadFromLocalStorage("score");
		if (savedScore !== null) {
			setScore(savedScore);
		}
	}, []);

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
									<>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												mb: 2,
												p: 2,
												borderRadius: 2,
												backgroundColor: `${colorPrimary}20`,
											}}
										>
											<Typography variant="h6" align="center">
												Your prediction: price will go{" "}
												<Box
													component="span"
													sx={{
														fontWeight: "bold",
														color:
															guess === GuessType.UP
																? "success.main"
																: "error.main",
														display: "inline-flex",
														alignItems: "center",
													}}
												>
													{guess === GuessType.UP ? "UP" : "DOWN"}
													{guess === GuessType.UP ? (
														<ThumbUpRoundedIcon sx={{ ml: 1 }} />
													) : (
														<ThumbDownRoundedIcon sx={{ ml: 1 }} />
													)}
												</Box>
											</Typography>
										</Box>
										<CountdownTimer
											startTime={guessTimeRef.current || Date.now()}
											duration={30000}
										/>
									</>
								) : (
									<GuessForm
										onSubmit={handleGuessSubmit}
										disabled={isWaiting}
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
										<ChatBox result={guessResult} />
									</Box>
									<Box>
										<Character result={guessResult} />
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
