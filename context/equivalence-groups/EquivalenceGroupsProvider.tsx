import { ReactNode, FC, useReducer, Reducer } from 'react';

import { EquivalenceGroupsState, INITIAL_STATE } from './state';
import { EquivalenceGroupsAction } from './actions';
import { reducer } from './reducer';
import { EquivalenceGroupsContext } from './context';

interface Props {
  children: ReactNode;
}

export const EquivalenceGroupsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalenceGroupsState, EquivalenceGroupsAction>>(
    reducer,
    INITIAL_STATE,
  );

  return (
    <EquivalenceGroupsContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EquivalenceGroupsContext.Provider>
  );
}
