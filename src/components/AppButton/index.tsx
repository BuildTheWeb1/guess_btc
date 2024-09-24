import { Button } from "@mui/material";
import { useCallback, useMemo } from "react";
import { colorPrimary } from "../../utils";

interface AppButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  isOutlined?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  text,
  disabled,
  isOutlined,
  onClick,
}) => {
  const baseStyles = useMemo(
    () => ({ borderRadius: "3rem", padding: ".75rem 1.5rem" }),
    []
  );

  const handleButtonStyle = useCallback(() => {
    switch (true) {
      case isOutlined:
        return {
          borderColor: "#000",
          color: "#000",
          ...baseStyles,
          "&:hover": {
            backgroundColor: "#F0F0F0",
            borderColor: "#000",
          },
        };

      default:
        return {
          backgroundColor: colorPrimary,
          color: "#000",
          ...baseStyles,
          "&:hover": {
            backgroundColor: "#44E044",
          },
        };
    }
  }, [baseStyles, isOutlined]);

  return (
    <Button
      onClick={onClick}
      variant={isOutlined ? "outlined" : "contained"}
      sx={handleButtonStyle()}
      disabled={disabled}
      size="large"
    >
      {text}
    </Button>
  );
};

export default AppButton;
