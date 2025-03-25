import { GameEntity } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";

export const useGame = (gameId: GameId) => {
  const { isPending, dataStream } = useEventsSource<GameEntity>(
    routes.gameStream(gameId),
  );

  return {
    game: dataStream,
    isPending,
  };
};
