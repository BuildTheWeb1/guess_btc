import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { colorError } from "../../utils";

interface CountdownTimerProps {
  startTime: number;
  duration: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startTime, duration }) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    Math.max(0, Math.floor((startTime + duration - Date.now()) / 1000))
  );

  useEffect(() => {
    if (timeLeft === 0) return;

    const timerId = setInterval(() => {
      const newTimeLeft = Math.max(0, Math.floor((startTime + duration - Date.now()) / 1000));
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, startTime, duration]);

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
        variant="determinate"
        value={Math.max(0, (timeLeft / (duration / 1000)) * 100)}
      />
    </Box>
  );
};

export default CountdownTimer;
