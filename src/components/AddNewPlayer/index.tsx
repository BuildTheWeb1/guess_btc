import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { CreatePlayersMutation } from "../../graphql/GraphQLAPI";
import { createPlayers } from "../../graphql/mutations";
import { PlayerType } from "../../types";
import { colorError, colorPrimary, queryClient } from "../../utils";
import AppButton from "../AppButton";

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
      <AppButton
        text="Add New Player!"
        onClick={handleOpen}
        disabled={isDisabled}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-player-title"
        aria-describedby="add-new-player-description"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "1rem",
            padding: "1rem",
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
            component="span"
            display="block"
            pt={2}
            sx={{ color: "#757575", fontSize: "1rem" }}
          >
            <TextField
              fullWidth
              label="enter player name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4rem",
                  "&.Mui-focused fieldset": {
                    borderColor: colorPrimary,
                  },
                  "&.Mui-error fieldset": {
                    borderColor: colorError,
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: colorError,
                  },
                },
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "1.5rem",
          }}
        >
          <AppButton onClick={handleClose} text="Cancel" isOutlined />
          <AppButton onClick={handleSubmit} text="Create Player" />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNewPlayer;
