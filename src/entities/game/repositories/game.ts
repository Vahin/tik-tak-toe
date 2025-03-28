import { prisma } from "@/shared/lib/db";
import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "../domain";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { removePassword } from "@/shared/lib/remove-password";
import { GameId } from "@/kernel/ids";

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
        field: fieldSchema.parse(game.field),
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

const getGame = async (
  where?: Prisma.GameWhereInput,
): Promise<GameEntity | null> => {
  const game = await prisma.game.findFirst({
    where,
    include: { players: true, winner: true },
  });

  if (!game) return null;

  return dbGameToGameEntity(game);
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

const startGame = async (
  gameId: GameId,
  player: PlayerEntity,
): Promise<GameEntity> => {
  return dbGameToGameEntity(
    await prisma.game.update({
      where: { id: gameId },
      data: {
        players: {
          connect: {
            id: player.id,
          },
        },
        status: "inProgress",
      },
      include: {
        players: true,
        winner: true,
      },
    }),
  );
};

export const gameRepository = { getGame, getGamesList, createGame, startGame };
