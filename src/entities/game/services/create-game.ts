"use server";

import { Left, left, right, Right } from "@/shared/lib/either";
import { GameEntity, PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import cuid from "cuid";

type CreateGameErrorType = Left<string>;
type CreateGameSuccessType = Right<GameEntity>;

type CreateGameType = CreateGameErrorType | CreateGameSuccessType;

export const createGame = async (
  user: PlayerEntity,
): Promise<CreateGameType> => {
  const playerGames = await gameRepository.getGamesList({
    players: { some: { id: user.id } },
    status: "idle",
  });

  if (
    playerGames.some(
      (game) => game.status === "idle" && game.creator.id === user.id,
    )
  ) {
    return left("can-create-only-one-game");
  }

  const createdGame = await gameRepository.createGame({
    id: cuid(),
    status: "idle",
    creator: user,
  });

  return right(createdGame);
};
