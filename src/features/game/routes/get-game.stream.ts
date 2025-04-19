import { getGameById, surrenderGame } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { gameEventsService } from "../services/game-events";
import { getCurrentUser } from "@/entities/user/server";

export const getGameStream = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) => {
  const id = (await params).id;
  const game = await getGameById(id);

  if (game.type === "left") {
    return new Response("Game not found", { status: 404 });
  }

  const user = await getCurrentUser();

  if (user.type === "left") {
    return new Response("User not found", { status: 404 });
  }

  const { write, response, addCloseListener } = sseStream(req);

  write(game.value);

  const unsubscribe = await gameEventsService.addListener(
    game.value.id,
    (event) => {
      write(event.data);
    },
  );

  addCloseListener(async () => {
    unsubscribe();
    const result = await surrenderGame(id, user.value.id);

    if (result.type === "right") {
      gameEventsService.emit(result.value);
    }
  });

  return response;
};
