import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { CreatePlayersMutation } from "../../graphql/GraphQLAPI";
import { createPlayers } from "../../graphql/mutations";
import { PlayerType } from "../../types";
import { queryClient } from "../../utils";

interface AddNewPlayerProps {
  onCreate: (newPlayer: PlayerType) => void;
  isDisabled: boolean;
}

const AddNewPlayer: React.FC<AddNewPlayerProps> = ({
  onCreate,
  isDisabled,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const appliedColor = useMemo(() => "#8e24aa", []);
  const hoverAppliedColor = useMemo(() => "#6a1b9a", []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = useCallback(async () => {
    if (name.trim() === "") {
      setError("Player name cannot be empty.");
      return;
    }

    try {
      const result = await queryClient.graphql(
        graphqlOperation(createPlayers, {
          input: {
            id: Math.floor(Math.random() * 900) + 100,
            name,
            score: 0,
          },
        })
      );

      const newPlayer = (
        (result as GraphQLResult).data as CreatePlayersMutation
      ).createPlayers;

      setOpen(false);
      if (newPlayer) {
        onCreate({
          id: newPlayer.id,
          name: newPlayer.name || "Unknown Player",
          score: 0,
        });
      }
      setName("");
      setError(null);
    } catch (error) {
      setError("Failed to create a new player. Please try again.");
      console.error("Error creating player:", error);
    }
  }, [name, onCreate]);

  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleOpen}
        disabled={isDisabled}
        sx={{
          fontWeight: "bold",
          borderRadius: "0.75rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: appliedColor,
          fontSize: "1rem",
          color: "#fff",
          "&:hover": {
            backgroundColor: hoverAppliedColor,
          },
        }}
      >
        Add New Player
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-player-title"
        aria-describedby="add-new-player-description"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "16px",
          },
        }}
      >
        <DialogTitle
          id="add-new-player-title"
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Add a new player
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="add-new-player-description"
            py={2}
            sx={{ color: "#757575", fontSize: "1rem" }}
          >
            <TextField
              fullWidth
              label="Player Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error}
              helperText={error}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "8px 1.5rem",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: hoverAppliedColor,
              fontWeight: "bold",
              "&:hover": {
                color: appliedColor,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: "8px 16px",
              fontWeight: "bold",
              backgroundColor: appliedColor,
              color: "#fff",
              "&:hover": {
                backgroundColor: hoverAppliedColor,
              },
            }}
          >
            Create Player
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNewPlayer;
