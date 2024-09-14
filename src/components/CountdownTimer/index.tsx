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

  return <p>Guess result in {timeLeft} seconds...</p>;
};

export default CountdownTimer;
