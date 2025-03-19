type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const GamePage = async ({ params }: GamePageProps) => {
  const id = (await params).id;
  return <div> Game:{id}</div>;
};

export default GamePage;
