import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePreviousValue } from "../../hooks";

interface BTCPriceProps {
  price: number;
}

const BTCPrice: React.FC<BTCPriceProps> = ({ price }) => {
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const previousPriceRef = useRef<number | null>(null);
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

  useEffect(() => {
    if (previousPrice !== null && previousPrice !== price) {
      previousPriceRef.current = previousPrice;
    }
  }, [price, previousPrice]);

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" gap={4}>
        <Box display="flex" alignItems="center">
          <CurrencyBitcoinIcon sx={{ fontSize: "4rem" }} />
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

      {previousPriceRef.current !== null && (
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: "#00C853",
              borderRadius: "50%",
            }}
          />
          <Typography fontSize={{ xs: "1rem", md: "1.5rem" }} color="gray">
            Previous Price: ${previousPriceRef.current}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BTCPrice;
