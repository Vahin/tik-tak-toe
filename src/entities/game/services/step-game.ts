import { right } from "./../../../shared/lib/either";
import { GameId } from "@/kernel/ids";
import { gameRepository } from "../repositories/game";
import { left } from "@/shared/lib/either";
import { doStep } from "../domain";

export const stepGame = async (
  gameId: GameId,
  playerId: string,
  cellIndex: number,
) => {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) return left("game-not-found" as const);

  if (game.status !== "inProgress")
    return left("game-is-not-in-progress" as const);

  if (!game.players.some((p) => p.id === playerId))
    return left("player-not-in-the-game" as const);

  const player = game.players.find((p) => p.id === playerId)!;

  const newGame = doStep(game, player, cellIndex);

  if (newGame.type === "left") {
    return newGame;
  }

  return right(await gameRepository.saveGame(newGame.value));
};
