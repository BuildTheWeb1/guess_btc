import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Fab, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { GuessType, PlayerType } from "../../types";
import { colorPrimary } from "../../utils";
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
      <Box display="flex" flexDirection="column" maxWidth={200}>
        <Box textAlign="center" mb={2}>
          <IconButton
            aria-label="price going up"
            onClick={() => handleIconClick(GuessType.UP)}
            color="inherit"
          >
            <KeyboardDoubleArrowUpIcon sx={{ fontSize: 50 }} />
          </IconButton>

          <IconButton
            aria-label="price going down"
            onClick={() => handleIconClick(GuessType.DOWN)}
            color="inherit"
          >
            <KeyboardDoubleArrowDownIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </Box>

        <Fab
          variant="extended"
          type="submit"
          disabled={!guess || !player}
          sx={{
            backgroundColor: colorPrimary,
            color: "#000",
            borderRadius: "3rem",
            padding: ".75rem 1.5rem",
            "&:hover": {
              backgroundColor: "#44E044",
            },
          }}
        >
          Submit Guess
          <KeyboardDoubleArrowRightIcon />
        </Fab>
      </Box>
    </form>
  );
};

export default GuessForm;
