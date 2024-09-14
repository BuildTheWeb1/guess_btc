import { Alert, AlertColor, Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { GuessResultType, GuessType } from "../../types";

interface ChatBoxProps {
  guess: GuessType | null;
  guessResult: GuessResultType | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ guess, guessResult }) => {
  const handleFeedback = useCallback((): {
    message: string;
    alertType: AlertColor;
  } | null => {
    switch (guessResult) {
      case GuessResultType.CORRECT:
        return {
          message: "Great choice! Score increased.",
          alertType: "success",
        };
      case GuessResultType.INCORRECT:
        return {
          message: "Nope! Guess again. Score decreased.",
          alertType: "error",
        };
      case GuessResultType.NEUTRAL:
        return {
          message: "Price did not change. Score remains the same.",
          alertType: "warning",
        };
      default:
        return null;
    }
  }, [guessResult]);

  const feedback = handleFeedback();

  return (
    <Box mt={4} mx="20%">
      {guess !== null && guessResult !== GuessResultType.NEUTRAL && (
        <Typography variant="h5" textAlign="center">
          Ok, you think the price will go:
          <Typography
            variant="h5"
            color={guess === GuessType.UP ? "success" : "error"}
          >
            {guess.toLocaleUpperCase()}
          </Typography>
          Let's see if you are right...
        </Typography>
      )}
      {guessResult != null && (
        <Alert severity={feedback?.alertType}>{feedback?.message}</Alert>
      )}
    </Box>
  );
};

export default ChatBox;
