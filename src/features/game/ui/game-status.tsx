import { GameEntity } from "@/entities/game";
import { getCurrentSymbol } from "@/entities/game/server";

type GameStatusProps = {
  game: GameEntity;
};

export const GameStatus = (props: GameStatusProps) => {
  const { game } = props;

  switch (game.status) {
    case "idle":
      return <div className="text-lg">Ожидание игрока</div>;
    case "inProgress": {
      const currentSymbol = getCurrentSymbol(game);

      return <div className="text-lg">Ход: {currentSymbol}</div>;
    }
    case "gameOver": {
      const currentSymbol = getCurrentSymbol(game);

      return <div className="text-lg">Победитель: {currentSymbol}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg">Ничья</div>;
  }
};
