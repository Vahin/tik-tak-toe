import { GameId } from "@/kernel/ids";
import { GameClient } from "./game-client";
import { getCurrentUser } from "@/entities/user/server";
import { getGameById, startGame } from "@/entities/game/server";
import { gameEventsService } from "../services/game-events";

type GameProps = {
  gameId: GameId;
};

export const Game = async (props: GameProps) => {
  const { gameId } = props;

  const user = await getCurrentUser();

  if (user.type === "left") {
    throw new Error("User not found");
  }

  let game = await getGameById(gameId);

  if (game.type === "left") {
    throw new Error("Game doen't exist");
  }

  const startGameResult = await startGame(gameId, user.value);

  if (startGameResult.type === "right") {
    game = startGameResult;
    gameEventsService.emit(startGameResult.value);
  }

  return <GameClient defaultGame={game.value} />;
};
