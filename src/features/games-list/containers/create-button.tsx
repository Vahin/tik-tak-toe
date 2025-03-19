"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game-action";
import { useActionState } from "@/shared/lib/react";
import { matchEither, right } from "@/shared/lib/either";
import { useTransition } from "react";

export const CreateButton = () => {
  const [data, dispatch, isPending] = useActionState(
    createGameAction,
    right(undefined),
  );

  const [isTransitionPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      dispatch();
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <Button disabled={isPending || isTransitionPending} onClick={handleClick}>
        Создайте игру
      </Button>
      {/* TODO: Вызывать toast для показа ошибки пользователю. */}
      {matchEither(data, {
        right: () => null,
        left: (e) => {
          return {
            ["can-create-only-one-game"]: "Вы можете создать только одну игру.",
            ["user-not-found"]: "Пользователя нет.",
          }[e];
        },
      })}
    </div>
  );
};
