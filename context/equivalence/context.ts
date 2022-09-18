import { createContext, useContext } from 'react';

import { EquivalenceState } from './state';
import { IPaymentGroup } from '../../interfaces/payment-group';

type CtxProps =
  & EquivalenceState
  & {
    computeEquivalence: (group: IPaymentGroup, targetPosition: number) => Promise<void>;
  }
  ;

export const EquivalenceContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalenceContext = () => useContext<CtxProps>(EquivalenceContext);
