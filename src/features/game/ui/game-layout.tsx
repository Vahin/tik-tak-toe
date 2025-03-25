import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type GameLayoutProps = {
  status?: React.ReactNode;
  field?: React.ReactNode;
  players?: React.ReactNode;
};

export const GameLayout = (props: GameLayoutProps) => {
  const { players, status, field } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Крестики-Нолики 3х3</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">{field}</div>
      </CardContent>
    </Card>
  );
};
