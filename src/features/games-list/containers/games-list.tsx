import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/root-layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "./create-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/kernel/routes";

// todo: 1. Сделать проверку, что бы пользователь не мог зайти в свою игру.

export const GamesList = async () => {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
          actions={
            <Button asChild>
              <Link href={routes.game(game.id)}>Подключиться</Link>
            </Button>
          }
        />
      ))}
    </Layout>
  );
};
