import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { usePreviousValue } from "../../hooks";

interface BTCPriceProps {
  price: number;
}

const BTCPrice: React.FC<BTCPriceProps> = ({ price }) => {
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const previousPrice = usePreviousValue(price);

  const responsiveFontStyle = useMemo(
    () => ({ xs: "2rem", md: "3rem", lg: "3.5rem" }),
    []
  );

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
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center">
        <CurrencyBitcoinIcon style={{ fontSize: "4rem" }} />
        <Typography fontSize={responsiveFontStyle}>Price:</Typography>
      </Box>

      <Typography
        fontWeight="bold"
        fontSize={responsiveFontStyle}
        color={flashColor || "inherit"}
        style={{
          transition: "color 0.5s ease",
        }}
      >
        {price !== null ? `$${price}` : "Loading..."}
      </Typography>
    </Box>
  );
};

export default BTCPrice;
