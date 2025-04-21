import { GameId } from "@/kernel/ids";
import { Left, left, right, Right } from "@/shared/lib/either";

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

export const getPlayerSymbol = (
  player: PlayerEntity,
  game: GameInProgressEntity,
) => {
  const playerIndex = game.players.findIndex((p) => p.id === player.id);

  return { 0: GameSymbol.X, 1: GameSymbol.O }[playerIndex];
};

const calculateWinner = (field: Field) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (field[a] && field[a] === field[b] && field[a] === field[c]) {
      return field[a];
    }
  }

  return null;
};

const isDraw = (field: Field) => {
  const hasWinner = calculateWinner(field);

  if (hasWinner) return false;

  return !field.some((cell) => !cell);
};

export const doStep = (
  game: GameInProgressEntity,
  player: PlayerEntity,
  index: number,
):
  | Right<GameInProgressEntity>
  | Right<GameOverEntity>
  | Right<GameOverDrawEntity>
  | Left<string> => {
  const stepSymbol = getCurrentSymbol(game);
  const playerSymbol = getPlayerSymbol(player, game);

  if (stepSymbol !== playerSymbol) return left("another-player-step" as const);

  if (game.field[index]) {
    return left("cell-is-not-availible" as const);
  }

  const newField: Field = game.field.map((cell, i) =>
    index === i ? playerSymbol : cell,
  );

  const winnerSymbol = calculateWinner(newField);

  if (winnerSymbol) {
    return right({
      ...game,
      status: "gameOver",
      winner: player,
      field: newField,
    } satisfies GameOverEntity);
  }

  if (isDraw(newField)) {
    return right({
      ...game,
      status: "gameOverDraw",
      field: newField,
    } satisfies GameOverDrawEntity);
  }

  return right({
    ...game,
    field: newField,
  } satisfies GameInProgressEntity);
};
