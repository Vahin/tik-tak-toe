import { Prisma } from "@prisma/client";

import { prisma } from "@/shared/lib/db";
import { UserEntity } from "../domain";

const saveUser = async (user: UserEntity): Promise<UserEntity> => {
  return await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: user,
    update: user,
  });
};

const getUser = async (
  where: Prisma.UserWhereInput,
): Promise<UserEntity | null> => {
  return await prisma.user.findFirst({
    where,
  });
};

export const userRepository = { saveUser, getUser };
