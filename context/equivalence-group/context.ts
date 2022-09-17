import { createContext, useContext } from 'react';

import { EquivalenceGroupState } from './state';

type CtxProps =
  & EquivalenceGroupState
  ;

export const EquivalenceGroupContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalenceGroupContext = () => useContext<CtxProps>(EquivalenceGroupContext);
