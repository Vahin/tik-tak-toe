import { GameId } from "@/kernel/ids";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";

export const getGameById = async (gameId: GameId) => {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found");
  }

  return right(game);
};
