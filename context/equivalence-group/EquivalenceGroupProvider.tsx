import { FC, ReactNode, useReducer, Reducer } from 'react';

import { EquivalenceGroupContext } from './context';
import { IPaymentGroup } from '../../interfaces/payment-group';
import { EquivalenceGroupAction } from './actions';
import { EquivalenceGroupState } from './state';
import { reducer } from './reducer';

interface Props {
  children: ReactNode;
  initialGroup: IPaymentGroup;
};

export const EquivalenceGroupProvider: FC<Props> = ({ children, initialGroup }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalenceGroupState, EquivalenceGroupAction>>(
    reducer,
    {
      group: initialGroup,
      addingPayment: false,
    },
  );

  return (
    <EquivalenceGroupContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EquivalenceGroupContext.Provider>
  );
}
