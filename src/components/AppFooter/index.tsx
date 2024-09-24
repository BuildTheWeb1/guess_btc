import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

const AppFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        backgroundColor: "#e8f5e9",
        padding: "1rem 0",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {currentYear} Claudiu C
      </Typography>
    </Box>
  );
};

export default AppFooter;
