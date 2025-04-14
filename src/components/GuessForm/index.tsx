import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Fab, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { GuessType } from "../../types";
import { colorPrimary } from "../../utils";

interface GuessFormProps {
	onSubmit: (guess: GuessType) => void;
	disabled: boolean;
}

const GuessForm: React.FC<GuessFormProps> = ({ onSubmit, disabled }) => {
	const [guess, setGuess] = useState<GuessType>(GuessType.NEUTRAL);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (guess) {
			onSubmit(guess);
		}
	};

	const handleIconClick = useCallback((guessType: GuessType) => {
		setGuess(guessType);
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<Box display="flex" flexDirection="column" maxWidth={200}>
				<Box textAlign="center" mb={2}>
					<IconButton
						aria-label="price going up"
						onClick={() => handleIconClick(GuessType.UP)}
						color="inherit"
					>
						<KeyboardDoubleArrowUpIcon sx={{ fontSize: 50 }} />
					</IconButton>

					<IconButton
						aria-label="price going down"
						onClick={() => handleIconClick(GuessType.DOWN)}
						color="inherit"
					>
						<KeyboardDoubleArrowDownIcon sx={{ fontSize: 50 }} />
					</IconButton>
				</Box>

				<Fab
					variant="extended"
					type="submit"
					disabled={!guess || disabled}
					sx={{
						backgroundColor: colorPrimary,
						color: "#000",
						borderRadius: "3rem",
						padding: ".75rem 1.5rem",
						"&:hover": {
							backgroundColor: "#44E044",
						},
					}}
				>
					Submit Guess
				</Fab>
			</Box>
		</form>
	);
};

export default GuessForm;
