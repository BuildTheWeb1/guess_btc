import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ListPlayersQuery } from "../../graphql/GraphQLAPI";
import { listPlayers } from "../../graphql/queries";
import { PlayerType } from "../../types";
import { queryClient } from "../../utils";

const SelectPlayer: React.FC<{ onSelect: (player: PlayerType) => void }> = ({
  onSelect,
}) => {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const result = (await queryClient.graphql({ query: listPlayers })) as {
          data: ListPlayersQuery;
        };
        setPlayers(result.data.listPlayers?.items as PlayerType[]);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Box sx={{ minWidth: 120 }} mt={2} mb={4} maxWidth={200} mx="auto">
      <FormControl fullWidth>
        <InputLabel id="player-select">Select Player:</InputLabel>
        <Select
          labelId="player-select"
          id="demo-simple-select"
          label="Select Player"
          onChange={handleSelectChange}
          value={selectedPlayer}
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
