"use server";

import { left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/userRepository";
import { sessionService } from "./session";

export const getCurrentUser = async () => {
  const { session } = await sessionService.verifySession();

  const user = await userRepository.getUser({ id: session.id });

  if (!user) {
    return left("user-not-found" as const);
  }

  return right(user);
};
