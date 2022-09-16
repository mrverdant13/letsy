import { EquivalenceGroupsState } from './state';
import { createContext, useContext } from 'react';

type CtxProps =
  & EquivalenceGroupsState
  ;

export const EquivalenceGroupsContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalenceGroupsContext = () => useContext<CtxProps>(EquivalenceGroupsContext);
