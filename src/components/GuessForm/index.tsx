import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

enum GuessType {
  UP = "up",
  DOWN = "down",
  NEUTRAL = "",
}

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
      <IconButton
        aria-label="price going up"
        color="success"
        onClick={() => setGuess(GuessType.UP)}
      >
        <KeyboardDoubleArrowUpIcon />
      </IconButton>

      <IconButton
        aria-label="price going down"
        color="error"
        onClick={() => setGuess(GuessType.DOWN)}
      >
        <KeyboardDoubleArrowDownIcon />
      </IconButton>

      <Button variant="outlined" size="large" type="submit" disabled={!guess}>
        Submit Guess
      </Button>
    </form>
  );
};

export default GuessForm;
