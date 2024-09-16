import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
      <LinearProgress color="secondary" />
    </Box>
  );
};

export default CountdownTimer;
