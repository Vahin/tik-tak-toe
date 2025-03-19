import { Either, left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/userRepository";
import cuid from "cuid";
import { DEFAULT_RATING, UserEntity } from "../domain";
import { passwordService } from "./password";

type CreateUserProps = {
  login: string;
  password: string;
};

export type CreateUserErrors = "login-allready-taken";
type CreateUserReturn = Either<CreateUserErrors, UserEntity>;

export const createUser = async (
  props: CreateUserProps,
): Promise<CreateUserReturn> => {
  const { login, password } = props;

  const userWithLogin = await userRepository.getUser({ login: login });

  if (userWithLogin) {
    return left("login-allready-taken");
  }

  const { hash, salt } = await passwordService.hashPassword({ password });

  const user = await userRepository.saveUser({
    id: cuid(),
    login,
    rating: DEFAULT_RATING,
    passwordHash: hash,
    salt,
  });

  return right(user);
};
