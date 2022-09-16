import { createContext, useContext } from 'react';

import { EquivalentValueGroupsState } from './state';

type CtxProps =
  & EquivalentValueGroupsState
  & {
    reset: () => Promise<void>;
    createGroup: (name: string) => Promise<void>;
  }
  ;

export const EquivalentValueGroupsContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalentValueGroupsContext = () => useContext<CtxProps>(EquivalentValueGroupsContext);