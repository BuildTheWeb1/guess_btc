import { Box, CircularProgress, Typography } from "@mui/material";
import { colorError } from "../../utils";

const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h3" mb={4} textAlign="center">
        Waiting for API to load...
      </Typography>
      <CircularProgress
        size="6rem"
        sx={{
          color: colorError,
        }}
      />
    </Box>
  );
};

export default Loader;
