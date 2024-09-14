import { Box, CircularProgress } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size="5rem" />
    </Box>
  );
};

export default Loader;
