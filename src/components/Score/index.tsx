import { Typography } from "@mui/material";
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
    <Typography
      variant="h4"
      gutterBottom
      color={flashColor || "inherit"}
      style={{
        transition: "color 0.5s ease",
      }}
    >
      SCORE: {Math.max(score, 0)}
    </Typography>
  );
};

export default Score;
