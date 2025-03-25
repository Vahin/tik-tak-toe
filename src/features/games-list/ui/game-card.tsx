import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

type GameCardProps = {
  login: string;
  rating: number;
  actions: React.ReactNode;
};

export const GameCard = (props: GameCardProps) => {
  const { login, rating, actions } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Игра с {login}</CardTitle>
      </CardHeader>
      <CardContent>Рейтинг: {rating}</CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
};
