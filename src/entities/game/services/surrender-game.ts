import { right } from "./../../../shared/lib/either";
import { GameId } from "@/kernel/ids";
import { gameRepository } from "../repositories/game";
import { left } from "@/shared/lib/either";

export const surrenderGame = async (gameId: GameId, looserId: string) => {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) return left("game-not-found" as const);

  if (game.status === "idle") {
    return right(await gameRepository.deleteGame(gameId));
  }

  if (game.status !== "inProgress") return left("game-is-finished" as const);

  if (!game.players.some((p) => p.id === looserId))
    return left("player-not-in-the-game" as const);

  const winner = game.players.find((p) => p.id !== looserId)!;

  return right(
    await gameRepository.saveGame({
      ...game,
      status: "gameOver",
      winner,
    }),
  );
};
