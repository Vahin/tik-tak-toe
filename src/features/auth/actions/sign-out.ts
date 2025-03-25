"use server";

import { sessionService } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";

export const signOutAction = async () => {
  sessionService.deleteSession();
  redirect(routes.signIn());
};
