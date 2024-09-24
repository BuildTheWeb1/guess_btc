import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useCallback } from "react";

interface AlertSnackProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertSnack: React.FC<AlertSnackProps> = ({ open, handleClose }) => {
  const handleCloseAlert = useCallback(
    (_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }

      handleClose(false);
    },

    [handleClose]
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleCloseAlert}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert
        severity="warning"
        variant="filled"
        sx={{
          width: "100%",
          fontSize: "1.25rem",
          "& .MuiAlert-icon": {
            fontSize: "2rem",
          },
          padding: "1rem",
          borderRadius: "1.5rem",
        }}
      >
        Please select a player before making a guess!
      </Alert>
    </Snackbar>
  );
};

export default AlertSnack;
