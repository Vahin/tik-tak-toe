import { GameEntity } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";
import { useTransition } from "react";
import { doStepAction } from "../actions/do-step-action";

export const useGame = (gameId: GameId) => {
  const { isPending, dataStream } = useEventsSource<GameEntity>(
    routes.gameStream(gameId),
  );

  const [isPendingTransition, startTransition] = useTransition();

  const gameStep = async (index: number) => {
    startTransition(async () => {
      await doStepAction({ index, gameId });
    });
  };

  return {
    game: dataStream,
    step: gameStep,
    isPending,
    isStepPending: isPendingTransition,
  };
};
