import { GameEntity } from "@/entities/game";

type GamePlayersProps = {
  game: GameEntity;
};

export const GamePlayers = (props: GamePlayersProps) => {
  const { game } = props;

  const firstPlayer = game.status === "idle" ? game.creator : game.players[0];

  const secondPlayer = game.status === "idle" ? undefined : game.players[1];

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="text-lg">
        X - {firstPlayer.login}: {firstPlayer.rating}
      </div>
      <div className="text-lg">
        0 -{" "}
        {secondPlayer
          ? `${secondPlayer.login}: ${secondPlayer.rating}`
          : "Ожидание"}
      </div>
    </div>
  );
};
