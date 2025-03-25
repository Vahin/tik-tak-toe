import { getGameById } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";

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

  addCloseListener(() => {});

  return response;
};
