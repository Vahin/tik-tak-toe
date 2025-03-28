import { getGameById } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { gameEventsService } from "../services/game-events";

export const getGameStream = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) => {
  const id = (await params).id;

  const game = await getGameById(id);

  if (game.type === "left") {
    return new Response("Game not found", { status: 404 });
  }

  const { write, response, addCloseListener } = sseStream(req);

  write(game.value);

  const unsibscribe = await gameEventsService.addListener(
    game.value.id,
    (event) => {
      write(event.data);
    },
  );

  addCloseListener(unsibscribe);

  return response;
};
