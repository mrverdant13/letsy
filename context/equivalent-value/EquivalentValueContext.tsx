import { createContext, useContext } from 'react';

import { EquivalentValueState } from './equivalentValueReducer';
import { IPayment } from '../../interfaces/payment';

type CtxProps =
  EquivalentValueState &
  {
    addPayment: (payment: IPayment) => void;
    updatePayment: (name: string, payment: IPayment) => void;
    setInterest: (interest: number) => void;
    computeEquivalentValue: (targetPosition: number) => Promise<void>;
  }

export const EquivalentValueContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalentValueContext = () => useContext<CtxProps>(EquivalentValueContext);
