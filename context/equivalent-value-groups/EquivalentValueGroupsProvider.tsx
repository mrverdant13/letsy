import { ReactNode, FC, useReducer, Reducer } from 'react';

import { reducer } from './reducer';
import { INITIAL_STATE, EquivalentValueGroupsState } from './state';
import { EquivalentValueGroupsAction } from './actions';
import { EquivalentValueGroupsContext } from './context';

interface Props {
  children: ReactNode;
}

export const EquivalentValueGroupsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalentValueGroupsState, EquivalentValueGroupsAction>>(
    reducer,
    INITIAL_STATE,
  );

  return (
    <EquivalentValueGroupsContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EquivalentValueGroupsContext.Provider>
  );
}