import { Game } from "@/features/game/server";

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const GamePage = async ({ params }: GamePageProps) => {
  const id = (await params).id;

  return (
    <main className="flex flex-col grow pt-24 w-full max-w-[400px] mx-auto">
      <Game gameId={id} />
    </main>
  );
};

export default GamePage;
