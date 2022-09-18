import { createContext, useContext } from 'react';

import { EquivalenceState } from './state';

type CtxProps =
  & EquivalenceState
  ;

export const EquivalenceContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalenceContext = () => useContext<CtxProps>(EquivalenceContext);
