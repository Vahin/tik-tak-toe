"use server";

import { stepGame } from "@/entities/game/services/step-game";
import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left } from "@/shared/lib/either";
import { gameEventsService } from "../services/game-events";

export const doStepAction = async (options: {
  index: number;
  gameId: GameId;
}) => {
  const currentUser = await getCurrentUser();

  if (currentUser.type === "left") {
    return left("not-found-game-data");
  }

  const result = await stepGame(
    options.gameId,
    currentUser.value.id,
    options.index,
  );

  if (result.type === "right") {
    gameEventsService.emit(result.value);
  }

  return result;
};
