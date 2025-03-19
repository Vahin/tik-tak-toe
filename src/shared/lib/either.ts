export type Left<L> = {
  type: "left";
  error: L;
};

export type Right<R> = {
  type: "right";
  value: R;
};

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(error: L): Left<L> => ({
  type: "left",
  error,
});

export const right = <R>(value: R): Right<R> => ({
  type: "right",
  value,
});

export const mapRight = <R, R2, L = unknown>(
  either: Either<L, R>,
  fn: (value: R) => R2,
) => {
  if (either.type === "right") {
    return right(fn(either.value));
  }

  return either;
};

export const mapLeft = <L, L2, R>(
  either: Either<L, R>,
  fn: (value: L) => L2,
) => {
  if (either.type === "left") {
    return left(fn(either.error));
  }

  return either;
};

export const matchEither = <L, R, V>(
  either: Either<L, R>,
  matchers: {
    left: (error: L) => V;
    right: (value: R) => V;
  },
): V => {
  if (either.type === "left") {
    return matchers.left(either.error);
  }

  return matchers.right(either.value);
};
