"use server";

import { createGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
  const user = await getCurrentUser();

  if (user.type === "left") {
    return user;
  }

  const gameResult = await createGame(user.value);

  if (gameResult.type === "right") {
    redirect(routes.game(gameResult.value.id));
  }

  return gameResult;
};
