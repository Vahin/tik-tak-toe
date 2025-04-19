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
import { GameId } from "@/kernel/ids";
import { PlayerDTO } from "../model/player-dto";

type GamesWithPlayersAndWinner = Prisma.GameGetPayload<{
  include: {
    winner: true;
    players: {
      include: {
        user: true;
      };
    };
  };
}>;

const fieldSchema = z.array(z.union([z.string(), z.null()]));

const dbGameToGameEntity = (game: GamesWithPlayersAndWinner): GameEntity => {
  const players = game.players.map((p) => {
    const player = removePassword(p.user);
    const order = p.order;

    return { ...player, order };
  });

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
    include: {
      players: {
        include: { user: true },
        orderBy: { order: "asc" },
      },
      winner: true,
    },
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
      players: {
        include: {
          user: true,
        },
        orderBy: { order: "asc" },
      },
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
        create: {
          user: {
            connect: {
              id: game.creator.id,
            },
          },
        },
      },
    },
    include: {
      players: {
        include: {
          user: true,
        },
      },
      winner: true,
    },
  });

  return dbGameToGameEntity(createdGame);
};

const startGame = async (
  gameId: GameId,
  player: PlayerDTO,
): Promise<GameEntity> => {
  await prisma.gamePlayer.create({
    data: {
      game: {
        connect: {
          id: gameId,
        },
      },
      user: {
        connect: {
          id: player.id,
        },
      },
    },
  });

  const game = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      status: "inProgress",
    },
    include: {
      winner: true,
      players: {
        include: {
          user: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return dbGameToGameEntity(game);
};

const saveGame = async (
  game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity,
) => {
  const savedGame = await prisma.game.update({
    where: {
      id: game.id,
    },
    data: {
      status: game.status,
      field: game.field,
      winnerId: game.status === "gameOver" ? game.winner.id : undefined,
    },
    include: {
      winner: true,
      players: {
        include: {
          user: true,
        },
      },
    },
  });

  return dbGameToGameEntity(savedGame);
};

const deleteGame = async (gameId: GameId) => {
  const deletedGame = await prisma.game.delete({
    where: {
      id: gameId,
    },
    include: {
      winner: true,
      players: {
        include: {
          user: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return dbGameToGameEntity(deletedGame);
};

export const gameRepository = {
  getGame,
  getGamesList,
  createGame,
  startGame,
  deleteGame,
  saveGame,
};
