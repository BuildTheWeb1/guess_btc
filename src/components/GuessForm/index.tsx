import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Fab, IconButton } from "@mui/material";
import { useState } from "react";
import { GuessType } from "../../types";

interface GuessFormProps {
  onSubmitGuess: (guess: GuessType) => void;
}

const GuessForm: React.FC<GuessFormProps> = ({ onSubmitGuess }) => {
  const [guess, setGuess] = useState<GuessType>(GuessType.NEUTRAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess) {
      onSubmitGuess(guess);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <IconButton
          aria-label="price going up"
          color="secondary"
          onClick={() => setGuess(GuessType.UP)}
        >
          <KeyboardDoubleArrowUpIcon fontSize="large" />
        </IconButton>

        <IconButton
          aria-label="price going down"
          color="secondary"
          onClick={() => setGuess(GuessType.DOWN)}
        >
          <KeyboardDoubleArrowDownIcon fontSize="large" />
        </IconButton>
      </Box>

      <Fab variant="extended" color="secondary" type="submit" disabled={!guess}>
        Submit Guess
        <KeyboardDoubleArrowRightIcon />
      </Fab>
    </form>
  );
};

export default GuessForm;
