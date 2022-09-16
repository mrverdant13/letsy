import { createContext, useContext } from 'react';

import { EquivalentValueGroupsState } from './state';

type CtxProps =
  & EquivalentValueGroupsState
  ;

export const EquivalentValueGroupsContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalentValueGroupsContext = () => useContext<CtxProps>(EquivalentValueGroupsContext);