import { useActionState as useActionStateReact } from "react";

export function useAppActionState<State, InitialState>(
  action: (state: Awaited<State>) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string,
): [
  state: Awaited<State> | InitialState,
  dispatch: () => void,
  isPending: boolean,
];
export function useAppActionState<State, InitialState, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string,
): [
  state: Awaited<State> | InitialState,
  dispatch: (payload: Payload) => void,
  isPending: boolean,
];
export function useAppActionState(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any,
  permalink?: string,
) {
  return useActionStateReact(action, initialState, permalink);
}
