import { useTransition } from "react";
import { useAppActionState } from "./use-app-action-state";

export function useServerActionState<State, InitialState>(
  action: (state: Awaited<State>) => State | Promise<State>,
  initialState: Awaited<State> | InitialState,
  permalink?: string,
): {
  state: Awaited<State> | InitialState;
  dispatch: () => void;
  isPending: boolean;
} {
  const [state, setState, isActionPending] = useAppActionState(
    action,
    initialState,
    permalink,
  );

  const [isTransitionPending, startTransition] = useTransition();

  const dispatch = () => {
    startTransition(() => setState());
  };

  const isPending = isActionPending || isTransitionPending;

  return { state, dispatch, isPending };
}
