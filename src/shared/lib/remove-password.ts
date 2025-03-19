export const removePassword = <T extends { passwordHash: string }>(
  obj: T,
): Omit<T, "passwordHash"> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = obj;
  return rest;
};
