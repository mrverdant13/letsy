import { createContext, useContext } from 'react';

import { EquivalentValueGroupsState } from './state';

type CtxProps =
  & EquivalentValueGroupsState
  & {
    createGroup: (name: string) => Promise<void>;
  }
  ;

export const EquivalentValueGroupsContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalentValueGroupsContext = () => useContext<CtxProps>(EquivalentValueGroupsContext);