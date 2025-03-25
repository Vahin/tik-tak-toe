"use client";

import { Button } from "@/shared/ui/button";

import { signOutAction } from "../actions/sign-out";
import { useServerActionState } from "@/shared/lib/hooks/use-server-action-state";

type SignOutButtonProps = {
  children: React.ReactNode;
};

export const SignOutButton = ({ children }: SignOutButtonProps) => {
  const { dispatch, isPending } = useServerActionState(signOutAction, {});

  return (
    <Button onClick={() => dispatch()} disabled={isPending}>
      {children}
    </Button>
  );
};
