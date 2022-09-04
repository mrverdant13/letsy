import { createContext, useContext } from 'react';

import { EquivalentValueState } from './equivalentValueReducer';
import { IPayment } from '../../interfaces/payment';

type CtxProps =
  EquivalentValueState &
  {
    updatePayment: (name: string, payment: IPayment) => void;
  }

export const EquivalentValueContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalentValueContext = () => useContext<CtxProps>(EquivalentValueContext);
