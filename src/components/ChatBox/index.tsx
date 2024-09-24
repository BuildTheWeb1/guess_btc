import { AlertColor, Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { GuessResultType, GuessType } from "../../types";
import { colorError, colorPrimary } from "../../utils";

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
    <Box mt={4} color="white">
      {guess !== null && (
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography fontSize="1.2rem" fontWeight="bold">
            Ok, you think the price will go:{" "}
            <span
              style={{
                color: guess === GuessType.UP ? colorPrimary : colorError,
              }}
            >
              {guess.toLocaleUpperCase()}
            </span>
          </Typography>
          <Typography fontSize="1.2rem" fontWeight="bold">
            Let's see if you are right...
          </Typography>
        </Box>
      )}
      {resultFeedback && (
        <Typography
          fontSize="1.5rem"
          fontWeight="bold"
          color={
            resultFeedback.alertType === "success" ? colorPrimary : colorError
          }
        >
          {resultFeedback.message}
        </Typography>
      )}
    </Box>
  );
};

export default ChatBox;
