"use server";

import { Either, left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/userRepository";
import { passwordService } from "./password";
import { UserEntity } from "../domain";

type VerifyUserProps = {
  login: string;
  password: string;
};

export type VerifyUserPasswordErrors = "wrong-login-or-password";
type verifyUserPasswordReturn = Either<VerifyUserPasswordErrors, UserEntity>;

export const verifyUserPassword = async (
  props: VerifyUserProps,
): Promise<verifyUserPasswordReturn> => {
  const { login, password } = props;
  const user = await userRepository.getUser({ login: login });

  if (!user) {
    return left("wrong-login-or-password" as const);
  }

  const isCompare = await passwordService.comparePasswords({
    hash: user.passwordHash,
    salt: user.salt,
    password,
  });

  if (!isCompare) {
    return left("wrong-login-or-password" as const);
  }

  return right(user);
};
