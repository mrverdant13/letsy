import { FC, ReactNode, useReducer, Reducer } from 'react';

import { EquivalenceGroupContext } from './context';
import { IPaymentGroup } from '../../interfaces/payment-group';
import { EquivalenceGroupAction } from './actions';
import { EquivalenceGroupState } from './state';
import { reducer } from './reducer';
import { IPayment } from '../../interfaces/payment';

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

  const addPayment = async (payment: IPayment) => {
    dispatch({
      type: '[EquivalenceGroup] Adding Payment',
    });
    const currentGroup = state.group;
    const group = {
      ...currentGroup,
      payments: [
        ...currentGroup.payments,
        payment,
      ],
    };
    dispatch({
      type: '[EquivalenceGroup] Added Payment',
      group,
    });
  }

  return (
    <EquivalenceGroupContext.Provider
      value={{
        ...state,
        addPayment,
      }}
    >
      {children}
    </EquivalenceGroupContext.Provider>
  );
}
