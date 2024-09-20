import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Fab, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { GuessType, PlayerType } from "../../types";
import AlertSnack from "../AlertSnack";

interface GuessFormProps {
  player: PlayerType | null;
  onSubmitGuess: (guess: GuessType) => void;
}

const GuessForm: React.FC<GuessFormProps> = ({ player, onSubmitGuess }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [guess, setGuess] = useState<GuessType>(GuessType.NEUTRAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (guess) {
      onSubmitGuess(guess);
    }
  };

  const handleIconClick = useCallback(
    (guessType: GuessType) => {
      if (!player) {
        setShowAlert(true);
        return;
      }
      setGuess(guessType);
    },
    [player]
  );

  return (
    <form onSubmit={handleSubmit}>
      <AlertSnack open={showAlert} handleClose={setShowAlert} />
      <Box>
        <IconButton
          aria-label="price going up"
          color="secondary"
          onClick={() => handleIconClick(GuessType.UP)}
        >
          <KeyboardDoubleArrowUpIcon fontSize="large" />
        </IconButton>

        <IconButton
          aria-label="price going down"
          color="secondary"
          onClick={() => handleIconClick(GuessType.DOWN)}
        >
          <KeyboardDoubleArrowDownIcon fontSize="large" />
        </IconButton>
      </Box>

      <Fab
        variant="extended"
        color="secondary"
        type="submit"
        disabled={!guess || !player}
      >
        Submit Guess
        <KeyboardDoubleArrowRightIcon />
      </Fab>
    </form>
  );
};

export default GuessForm;
