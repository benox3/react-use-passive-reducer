import { useCallback, useRef } from 'react';

import {
  ActionHandler,
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
} from './types';

export default function usePassiveReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  actionHandler: ActionHandler<ReducerState<R>, ReducerAction<R>>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const passiveState = useRef(initialState);

  const dispatch = useCallback(
    (action: ReducerAction<R>): void => {
      passiveState.current = reducer(passiveState.current, action);
      actionHandler(passiveState.current, action);
    },
    [reducer, actionHandler],
  );

  return [passiveState.current, dispatch];
}
