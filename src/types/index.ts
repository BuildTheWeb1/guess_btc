export enum GuessType {
  UP = "up",
  DOWN = "down",
  NEUTRAL = "",
}

export enum GuessResultType {
  CORRECT = "correct",
  INCORRECT = "incorrect",
}

export interface PlayerType {
  id: string;
  name: string;
  score: number;
}
