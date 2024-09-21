import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { PlayerType } from "../../types";
import { loadFromLocalStorage } from "../../utils";

interface SelectPlayerProps {
  players: PlayerType[];
  currentPlayer: PlayerType | null;
  onSelect: (player: PlayerType) => void;
  isDisabled: boolean;
}

const SelectPlayer: React.FC<SelectPlayerProps> = ({
  players,
  onSelect,
  currentPlayer,
  isDisabled,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  useEffect(() => {
    if (currentPlayer) {
      setSelectedPlayer(currentPlayer.id);
    } else {
      const savedPlayer = loadFromLocalStorage("currentPlayer");
      if (savedPlayer) {
        setSelectedPlayer(savedPlayer.id);
      }
    }
  }, [currentPlayer]);

  const handleSelectChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const selectedId = event.target.value;
      setSelectedPlayer(selectedId);
      const selectedPlayer = players.find((p) => p.id === selectedId);
      if (selectedPlayer) {
        onSelect(selectedPlayer);
      }
    },
    [players, onSelect]
  );

  return (
    <Box sx={{ minWidth: 180 }} maxWidth={250}>
      <FormControl fullWidth disabled={isDisabled}>
        <InputLabel id="player-select">Select Player:</InputLabel>
        <Select
          labelId="player-select"
          id="demo-simple-select"
          label="Select Player"
          onChange={handleSelectChange}
          value={selectedPlayer}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {player.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectPlayer;
