"use server";

import { GameIdleEntity } from "../domain";
import { gameRepository } from "../repositories/game";

export const getIdleGames = async (): Promise<GameIdleEntity[]> => {
  const games = await gameRepository.getGamesList({ status: "idle" });

  return games as GameIdleEntity[];
};
