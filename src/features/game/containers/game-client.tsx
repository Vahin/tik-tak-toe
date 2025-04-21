"use client";

import { GameLayout } from "../ui/game-layout";
import { GamePlayers } from "../ui/game-players";
import { GameStatus } from "../ui/game-status";
import { GameField } from "../ui/game-field";
import { useGame } from "../model/use-game";
import { GameEntity } from "@/entities/game";

type GameClientProps = {
  defaultGame: GameEntity;
};

export const GameClient = (props: GameClientProps) => {
  const { defaultGame } = props;

  const { game = defaultGame, step } = useGame(defaultGame.id);

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} onCellClick={step} />}
    />
  );
};
