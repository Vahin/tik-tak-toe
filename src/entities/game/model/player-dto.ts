import { GameId } from "@/kernel/ids";

export type PlayerDTO = {
  id: GameId;
  login: string;
  rating: number;
};
