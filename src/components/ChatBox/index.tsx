import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { GuessResultType } from "../../types";
import { colorError, colorPrimary } from "../../utils";

interface ChatBoxProps {
	result: GuessResultType | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ result }) => {
	const handleFeedback = useCallback(() => {
		if (result === GuessResultType.CORRECT) {
			return {
				message: "Great choice! Score increased.",
				alertType: "success" as const,
			};
		}

		if (result === GuessResultType.INCORRECT) {
			return {
				message: "Wrong guess! Score decreased.",
				alertType: "error" as const,
			};
		}

		if (result === GuessResultType.UNCHANGED) {
			return {
				message: "Price didn't change! No score change.",
				alertType: "info" as const,
			};
		}

		return null;
	}, [result]);

	const resultFeedback = handleFeedback();

	return (
		<Box mt={4}>
			{!result && (
				<Typography fontSize="1.2rem" fontWeight="bold" color="white">
					Make your guess about the Bitcoin price direction!
				</Typography>
			)}
			{resultFeedback && (
				<Typography
					fontSize="1.5rem"
					fontWeight="bold"
					color={
						resultFeedback.alertType === "success" 
							? colorPrimary 
							: resultFeedback.alertType === "error"
								? colorError
								: "#2196F3" // Blue color for info
					}
				>
					{resultFeedback.message}
				</Typography>
			)}
		</Box>
	);
};

export default ChatBox;
