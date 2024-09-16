import { Box, CircularProgress, Typography } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h3" mb={2}>
        Waiting for API to load...
      </Typography>
      <CircularProgress size="5rem" />
    </Box>
  );
};

export default Loader;
