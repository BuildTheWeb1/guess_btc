import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { BitcoinLogo } from "../../assets";
import { usePreviousValue } from "../../hooks";

interface BTCPriceProps {
	price: number;
}

// Store the last 5 prices to calculate a trend
const priceHistory: number[] = [];
const MAX_HISTORY = 5;

const BTCPrice: React.FC<BTCPriceProps> = ({ price }) => {
	const [flashColor, setFlashColor] = useState<string | null>(null);
	const [trend, setTrend] = useState<"up" | "down" | "flat">("flat");
	const previousPriceRef = useRef<number | null>(null);
	const previousPrice = usePreviousValue(price);

	const responsiveFontStyle = useMemo(
		() => ({ xs: "2rem", md: "3rem", lg: "3.5rem" }),
		[],
	);

	// Calculate price trend based on recent history
	useEffect(() => {
		if (price !== null) {
			// Add current price to history
			priceHistory.push(price);

			// Keep only the last MAX_HISTORY prices
			if (priceHistory.length > MAX_HISTORY) {
				priceHistory.shift();
			}

			// Need at least 2 prices to determine a trend
			if (priceHistory.length >= 2) {
				// Calculate the overall trend direction
				const firstPrice = priceHistory[0];
				const lastPrice = priceHistory[priceHistory.length - 1];

				if (Math.abs(lastPrice - firstPrice) < 0.01) {
					setTrend("flat");
				} else if (lastPrice > firstPrice) {
					setTrend("up");
				} else {
					setTrend("down");
				}
			}
		}
	}, [price]);

	useEffect(() => {
		if (price !== null && previousPrice !== null) {
			if (price > previousPrice) {
				setFlashColor("success");
			} else if (price < previousPrice) {
				setFlashColor("error");
			}

			const timer = setTimeout(() => {
				setFlashColor(null);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [price, previousPrice]);

	useEffect(() => {
		if (previousPrice !== null && previousPrice !== price) {
			previousPriceRef.current = previousPrice;
		}
	}, [price, previousPrice]);

	// Render the trend indicator
	const renderTrendIndicator = () => {
		let icon: React.ReactNode;
		let color: "success" | "error" | "default";
		let label: string;

		switch (trend) {
			case "up":
				icon = <TrendingUpIcon />;
				color = "success";
				label = "Upward Trend";
				break;
			case "down":
				icon = <TrendingDownIcon />;
				color = "error";
				label = "Downward Trend";
				break;
			default:
				icon = <TrendingFlatIcon />;
				color = "default";
				label = "Stable";
		}

		return (
			<Chip
				icon={icon}
				label={label}
				color={color}
				size="medium"
				sx={{ ml: 2, fontWeight: "bold" }}
			/>
		);
	};

	return (
		<Box display="flex" flexDirection="column">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				gap={4}
			>
				<Box display="flex" alignItems="center">
					<img
						src={BitcoinLogo}
						alt="Bitcoin Logo"
						style={{ width: "8rem", height: "8rem" }}
					/>
					<Typography fontSize={responsiveFontStyle}>Price:</Typography>
				</Box>

				<Box display="flex" alignItems="center">
					<Typography
						fontWeight="bold"
						fontSize={responsiveFontStyle}
						color={flashColor || "inherit"}
						style={{
							transition: "color 0.5s ease",
						}}
					>
						{price !== null
							? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
							: "Loading..."}
					</Typography>
				</Box>
			</Box>

			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mt={2}
				height="28px"
			>
				<Box display="flex" alignItems="center" gap={2}>
					{previousPriceRef.current !== null ? (
						<>
							<Box
								sx={{
									width: "10px",
									height: "10px",
									backgroundColor: "#00C853",
									borderRadius: "50%",
								}}
							/>
							<Typography fontSize={{ xs: "1rem", md: "1.5rem" }} color="gray">
								Previous Price: $
								{previousPriceRef.current.toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</Typography>
						</>
					) : (
						<Typography
							fontSize={{ xs: "1rem", md: "1.5rem" }}
							color="gray"
							sx={{ opacity: 0.5 }}
						>
							Waiting for price change...
						</Typography>
					)}
				</Box>
				{renderTrendIndicator()}
			</Box>
		</Box>
	);
};

export default BTCPrice;
