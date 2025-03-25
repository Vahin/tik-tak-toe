"use client";

import { GameId } from "@/kernel/ids";
import { GameLayout } from "../ui/game-layout";
import { GamePlayers } from "../ui/game-players";
import { GameStatus } from "../ui/game-status";
import { GameField } from "../ui/game-field";
import { useGame } from "../model/use-game";

type GameProps = {
  gameId: GameId;
};

export const Game = (props: GameProps) => {
  const { gameId } = props;

  const { game, isPending } = useGame(gameId);

  if (!game || isPending) {
    return <GameLayout status="Загрузка" />;
  }

  console.log(game);

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
};
