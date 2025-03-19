import { pbkdf2, randomBytes } from "node:crypto";

type HashPasswordProps = {
  password: string;
  salt?: string;
};

async function hashPassword(props: HashPasswordProps) {
  const { password, salt = randomBytes(16).toString("hex") } = props;

  const hash = await new Promise<Buffer>((resolve, reject) =>
    pbkdf2(password, salt, 1000, 64, "sha512", (error, value) =>
      error ? reject(error) : resolve(value),
    ),
  );
  return { hash: hash.toString("hex"), salt };
}

type ComparePasswordProps = {
  password: string;
  hash: string;
  salt: string;
};

async function comparePasswords(props: ComparePasswordProps) {
  const { password, hash, salt } = props;

  return hash === (await hashPassword({ password, salt })).hash;
}

export const passwordService = { hashPassword, comparePasswords };
