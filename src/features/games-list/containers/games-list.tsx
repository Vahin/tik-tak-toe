import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/root-layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "./create-button";

export const GamesList = async () => {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
        />
      ))}
    </Layout>
  );
};
