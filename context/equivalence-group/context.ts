import { createContext, useContext } from 'react';

import { EquivalenceGroupState } from './state';
import { IPayment } from '../../interfaces/payment';

type CtxProps =
  & EquivalenceGroupState
  & {
    addPayment: (payment: IPayment) => Promise<void>;
    updateName: (name: string) => Promise<void>;
    updateInterest: (interest: number) => Promise<void>;
    updatePayment: (name: string, payment: IPayment) => Promise<void>;
    deletePayment: (name: string) => Promise<void>;
  }
  ;

export const EquivalenceGroupContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalenceGroupContext = () => useContext<CtxProps>(EquivalenceGroupContext);
