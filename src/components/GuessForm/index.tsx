import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { Box, Fab, IconButton, Typography } from "@mui/material";
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
			<Box display="flex" flexDirection="column" alignItems="center" maxWidth={300} mx="auto">
				<Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 2 }}>
					{guess === GuessType.NEUTRAL 
						? "Select your prediction" 
						: `You predict the price will go ${guess === GuessType.UP ? 'UP' : 'DOWN'}`}
				</Typography>
				
				<Box display="flex" justifyContent='space-evenly' width="100%" mb={3}>
					<Box 
						display="flex" 
						flexDirection="column" 
						alignItems="center"
						sx={{
							p: 2,
							borderRadius: 2,
							backgroundColor: guess === GuessType.UP ? `${colorPrimary}40` : 'transparent',
							transition: 'all 0.2s ease',
							transform: guess === GuessType.UP ? 'scale(1.1)' : 'scale(1)',
						}}
					>
						<IconButton
							aria-label="price going up"
							onClick={() => handleIconClick(GuessType.UP)}
							color={guess === GuessType.UP ? "success" : "inherit"}
							sx={{ 
								mb: 1,
								transition: 'all 0.2s ease',
							}}
						>
							<ThumbUpRoundedIcon sx={{ fontSize: 45 }} />
						</IconButton>
						<Typography variant="body2" fontWeight={guess === GuessType.UP ? 'bold' : 'normal'}>
							UP
						</Typography>
					</Box>

					<Box 
						display="flex" 
						flexDirection="column" 
						alignItems="center"
						sx={{
							p: 2,
							borderRadius: 2,
							backgroundColor: guess === GuessType.DOWN ? `${colorPrimary}40` : 'transparent',
							transition: 'all 0.2s ease',
							transform: guess === GuessType.DOWN ? 'scale(1.1)' : 'scale(1)',
						}}
					>
						<IconButton
							aria-label="price going down"
							onClick={() => handleIconClick(GuessType.DOWN)}
							color={guess === GuessType.DOWN ? "success" : "inherit"}
							sx={{ 
								mb: 1,
								transition: 'all 0.2s ease',
							}}
						>
							<ThumbDownRoundedIcon sx={{ fontSize: 45 }} />
						</IconButton>
						<Typography variant="body2" fontWeight={guess === GuessType.DOWN ? 'bold' : 'normal'}>
							DOWN
						</Typography>
					</Box>
				</Box>

				<Fab
					variant="extended"
					type="submit"
					disabled={guess === GuessType.NEUTRAL || disabled}
					sx={{
						backgroundColor: colorPrimary,
						color: "#000",
						borderRadius: "3rem",
						padding: ".75rem 1.5rem",
						"&:hover": {
							backgroundColor: "#44E044",
						},
						transition: 'all 0.3s ease',
						transform: guess !== GuessType.NEUTRAL ? 'scale(1.05)' : 'scale(1)',
					}}
				>
					Submit Guess
				</Fab>
			</Box>
		</form>
	);
};

export default GuessForm;
