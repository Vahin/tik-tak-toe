"use server";

import { Prisma } from "@prisma/client";
import { gameRepository } from "../repositories/game";
import { Left, left, Right, right } from "@/shared/lib/either";
import { GameEntity } from "../domain";

export const getGame = async (
  where: Prisma.GameWhereInput,
): Promise<Left<string> | Right<GameEntity>> => {
  const game = await gameRepository.getGame(where);

  if (!game) {
    return left("game-not-found" as const);
  }

  return right(game);
};
