import { ReactNode, FC, useReducer, Reducer } from 'react';

import { EquivalenceState } from './state';
import { EquivalenceAction } from './actions';
import { reducer } from './reducer';
import { EquivalenceContext } from './context';

interface Props {
  children: ReactNode[];
}

export const EquivalenceProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalenceState, EquivalenceAction>>(
    reducer,
    {
      loading: false,
    },
  );

  return (
    <EquivalenceContext.Provider
      value={{
        ...state,
      }}
    >
    </EquivalenceContext.Provider>
  )
}
