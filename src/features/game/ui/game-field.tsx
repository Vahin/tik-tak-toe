"use client";

import { GameEntity } from "@/entities/game";
import { Button } from "@/shared/ui/button";

type GameFieldProps = {
  game: GameEntity;
  onCellClick?: (index: number) => void;
};

export const GameField = (props: GameFieldProps) => {
  const { game, onCellClick } = props;

  if (game.status === "idle") return null;

  return (
    <div className="grid grid-cols-3">
      {game.field.map((cell, index) => (
        <Button
          variant={"ghost"}
          key={index}
          onClick={() => onCellClick?.(index)}
          className="border border-primary w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          {cell ?? ""}
        </Button>
      ))}
    </div>
  );
};
