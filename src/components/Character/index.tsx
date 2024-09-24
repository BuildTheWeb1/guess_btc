import { useCallback, useMemo } from "react";
import { CharacterHappy, CharacterNormal, CharacterSad } from "../../assets";
import { GuessResultType } from "../../types";

interface CharacterProps {
  guessResult: GuessResultType | null;
}

const Character: React.FC<CharacterProps> = ({ guessResult }) => {
  const baseStyles = useMemo(() => ({ width: "20rem", height: "20rem" }), []);

  const handleCharacterState = useCallback(() => {
    switch (guessResult) {
      case GuessResultType.CORRECT:
        return (
          <img
            src={CharacterHappy}
            alt="happy cartoon character"
            style={baseStyles}
          />
        );
      case GuessResultType.INCORRECT:
        return (
          <img
            src={CharacterSad}
            alt="sad cartoon character"
            style={baseStyles}
          />
        );

      default:
        return (
          <img
            src={CharacterNormal}
            alt="normal cartoon character"
            style={baseStyles}
          />
        );
    }
  }, [baseStyles, guessResult]);

  return handleCharacterState();
};

export default Character;
