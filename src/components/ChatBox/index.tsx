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
    if (guessResult === GuessResultType.CORRECT) {
      return {
        message: "Great choice! Score increased.",
        alertType: "success",
      };
    } else if (guessResult === GuessResultType.INCORRECT) {
      return {
        message: "Wrong guess! Score decreased.",
        alertType: "error",
      };
    }
    return null;
  }, [guessResult]);

  const resultFeedback = handleFeedback();

  return (
    <Box mt={4}>
      {guess !== null && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography fontSize="1.2rem">
            Ok, you think the price will go:{" "}
          </Typography>
          <Typography
            fontWeight="bold"
            fontSize="1.5rem"
            color={guess === GuessType.UP ? "success" : "error"}
          >
            {guess.toLocaleUpperCase()}
          </Typography>
          <Typography fontSize="1.2rem">
            Let's see if you are right...
          </Typography>
        </Box>
      )}

      {resultFeedback && (
        <Alert
          severity={resultFeedback.alertType}
          sx={{ fontWeight: "bold", fontSize: "1rem", borderRadius: "0.75rem" }}
        >
          {resultFeedback.message}
        </Alert>
      )}
    </Box>
  );
};

export default ChatBox;
