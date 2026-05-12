import { useDebouncedCallback } from "use-debounce";
import {
  MutationTuple,
  MutationResult,
  MutationFunctionOptions,
} from "@apollo/client";

export function useDebouncedMutation<TData, TVariables>(
  [mutation, result]: MutationTuple<TData, TVariables>,
  options: {
    delay: number;
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
  } = {
    delay: 1000,
  }
): [
  (options?: MutationFunctionOptions<TData, TVariables> | undefined) => void,
  {
    result: MutationResult<TData>;
    cancel: () => void;
    callPending: () => void;
  }
] {
  const [debounced, cancel, callPending] = useDebouncedCallback(
    mutation,
    options.delay,
    options
  );
  return [debounced, { result, cancel, callPending }];
}
