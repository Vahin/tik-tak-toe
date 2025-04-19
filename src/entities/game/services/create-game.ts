"use server";

import { Left, left, right, Right } from "@/shared/lib/either";
import { GameEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import cuid from "cuid";
import { PlayerDTO } from "../model/player-dto";

export const createGame = async (
  user: PlayerDTO,
): Promise<Left<string> | Right<GameEntity>> => {
  const playerGames = await gameRepository.getGamesList({
    players: { some: { id: user.id } },
    status: "idle",
  });

  if (
    playerGames.some(
      (game) => game.status === "idle" && game.creator.id === user.id,
    )
  ) {
    return left("can-create-only-one-game" as const);
  }

  const createdGame = await gameRepository.createGame({
    id: cuid(),
    status: "idle",
    creator: user,
    field: Array(9).fill(null),
  });

  return right(createdGame);
};
