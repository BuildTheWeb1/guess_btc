import { useCallback, useMemo } from "react";
import { CharacterHappy, CharacterNormal, CharacterSad } from "../../assets";
import { GuessResultType } from "../../types";
import { Box } from "@mui/material";

interface CharacterProps {
  result: GuessResultType | null;
}

const Character: React.FC<CharacterProps> = ({ result }) => {
  // Fixed dimensions to prevent layout shifts
  const containerStyles = useMemo(() => ({ 
    width: "20rem", 
    height: "20rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }), []);
  
  const imageStyles = useMemo(() => ({ 
    maxWidth: "100%", 
    maxHeight: "100%",
    objectFit: "contain" as const
  }), []);

  const handleCharacterState = useCallback(() => {
    let imageSrc: string;
    let altText: string;
    
    switch (result) {
      case GuessResultType.CORRECT:
        imageSrc = CharacterHappy;
        altText = "happy cartoon character";
        break;
      case GuessResultType.INCORRECT:
        imageSrc = CharacterSad;
        altText = "sad cartoon character";
        break;
      case GuessResultType.UNCHANGED:
        // Use the normal character for unchanged price
        imageSrc = CharacterNormal;
        altText = "neutral cartoon character";
        break;
      default:
        imageSrc = CharacterNormal;
        altText = "normal cartoon character";
        break;
    }
    
    return (
      <Box sx={containerStyles}>
        <img
          src={imageSrc}
          alt={altText}
          style={imageStyles}
        />
      </Box>
    );
  }, [containerStyles, imageStyles, result]);

  return handleCharacterState();
};

export default Character;
