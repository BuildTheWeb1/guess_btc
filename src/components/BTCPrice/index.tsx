import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { usePreviousValue } from "../../hooks";

interface BTCPriceProps {
  price: number;
}

const BTCPrice: React.FC<BTCPriceProps> = ({ price }) => {
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const previousPrice = usePreviousValue(price);

  useEffect(() => {
    if (price !== null && previousPrice !== null) {
      if (price > previousPrice) {
        setFlashColor("success");
      } else if (price < previousPrice) {
        setFlashColor("error");
      }

      const timer = setTimeout(() => {
        setFlashColor(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [price, previousPrice]);

  return (
    <Typography
      variant="h3"
      gutterBottom
      color={flashColor || "inherit"}
      style={{
        transition: "color 0.5s ease",
      }}
    >
      BTC Price: {price !== null ? `$${price}` : "Loading..."}
    </Typography>
  );
};

export default BTCPrice;
