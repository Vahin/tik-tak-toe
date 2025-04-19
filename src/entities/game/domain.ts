import { GameId } from "@/kernel/ids";

export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  status: "idle";
  creator: PlayerEntity;
  field: Field;
};

export type GameInProgressEntity = {
  id: GameId;
  status: "inProgress";
  players: PlayerEntity[];
  field: Field;
};

export type GameOverEntity = {
  id: GameId;
  status: "gameOver";
  players: PlayerEntity[];
  field: Field;
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: GameId;
  status: "gameOverDraw";
  players: PlayerEntity[];
  field: Field;
};

export type PlayerEntity = {
  id: GameId;
  login: string;
  rating: number;
  order?: number;
};

export type Field = Cell[];

export type Cell = GameSymbol | null;
export type GameSymbol = string;

export const GameSymbol = {
  X: "X",
  O: "O",
};

export const getCurrentSymbol = (
  game: GameInProgressEntity | GameOverEntity,
) => {
  const symbols = game.field.filter((s) => s !== null).length;

  return symbols % 2 === 0 ? GameSymbol.X : GameSymbol.O;
};
