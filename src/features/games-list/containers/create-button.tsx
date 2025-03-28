"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game-action";
import { matchEither, right } from "@/shared/lib/either";
import { useServerActionState } from "@/shared/lib/hooks/use-server-action-state";

export const CreateButton = () => {
  const { state, dispatch, isPending } = useServerActionState(
    createGameAction,
    right(undefined),
  );

  return (
    <div className="flex flex-col gap-1">
      <Button disabled={isPending} onClick={async () => dispatch()}>
        Создайте игру
      </Button>
      {/* TODO: Вызывать toast для показа ошибки пользователю. */}
      {matchEither(state, {
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
