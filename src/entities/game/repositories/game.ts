import { prisma } from "@/shared/lib/db";
import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
} from "../domain";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { removePassword } from "@/shared/lib/remove-password";

type GamesWithPlayersAndWinner = Prisma.GameGetPayload<{
  include: {
    winner: true;
    players: true;
  };
}>;

const fieldSchema = z.array(z.union([z.string(), z.null()]));

const dbGameToGameEntity = (game: GamesWithPlayersAndWinner): GameEntity => {
  const players = game.players.map(removePassword);

  switch (game.status) {
    case "idle": {
      const [creator] = players;

      if (!creator) {
        throw new Error("Creator should be in game idle");
      }

      return {
        id: game.id,
        creator,
        status: game.status,
      } satisfies GameIdleEntity;
    }
    case "inProgress": {
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: game.status,
      } satisfies GameInProgressEntity;
    }
    case "gameOver": {
      if (!game.winner) {
        throw new Error("Winner should be in game over");
      }
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        winner: game.winner,
        status: game.status,
      } satisfies GameOverEntity;
    }
    case "gameOverDraw": {
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: game.status,
      } satisfies GameOverDrawEntity;
    }
  }
};

const getGamesList = async (
  where?: Prisma.GameWhereInput,
): Promise<GameEntity[]> => {
  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  return games.map(dbGameToGameEntity);
};

const createGame = async (game: GameIdleEntity): Promise<GameEntity> => {
  const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      field: Array(9).fill(null),
      players: {
        connect: { id: game.creator.id },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });

  return dbGameToGameEntity(createdGame);
};

export const gameRepository = { getGamesList, createGame };
