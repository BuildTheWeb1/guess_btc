import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { usePreviousValue } from "../../hooks";

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const previousScore = usePreviousValue(score);

  useEffect(() => {
    if (previousScore === null) return;

    if (score > previousScore) {
      setFlashColor("success");
    } else if (score < previousScore) {
      setFlashColor("error");
    }

    const timer = setTimeout(() => {
      setFlashColor(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [score, previousScore]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" color="#FFF">
      <Typography
        sx={{ fontSize: "2rem" }}
        style={{
          transition: "color 0.5s ease",
        }}
      >
        SCORE:
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", fontSize: "4rem" }}
        color={flashColor || "inherit"}
      >
        {Math.max(score, 0)}
      </Typography>
    </Box>
  );
};

export default Score;
