import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { colorError } from "../../utils";

interface CountdownTimerProps {
  milliseconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ milliseconds }) => {
  const [timeLeft, setTimeLeft] = useState<number>(milliseconds / 1000);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <Box>
      <Typography mb={2}>
        {timeLeft > 0
          ? `Please wait at least ${timeLeft} seconds...`
          : "Waiting for BTC price to update"}
      </Typography>
      <LinearProgress
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: timeLeft > 5 ? "#4caf50" : colorError,
          },
        }}
      />
    </Box>
  );
};

export default CountdownTimer;
