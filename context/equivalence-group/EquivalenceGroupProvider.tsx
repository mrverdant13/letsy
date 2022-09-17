import { FC, ReactNode, useReducer, Reducer } from 'react';

import { EquivalenceGroupContext } from './context';
import { IPaymentGroup } from '../../interfaces/payment-group';
import { EquivalenceGroupAction } from './actions';
import { EquivalenceGroupState } from './state';
import { reducer } from './reducer';
import { IPayment } from '../../interfaces/payment';
import httpClient from '../../apis/_client';

interface Props {
  children: ReactNode;
  initialGroup: IPaymentGroup;
};

export const EquivalenceGroupProvider: FC<Props> = ({ children, initialGroup }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalenceGroupState, EquivalenceGroupAction>>(
    reducer,
    {
      group: initialGroup,
      loading: false,
    },
  );

  const addPayment = async (payment: IPayment) => {
    dispatch({
      type: '[EquivalenceGroup] Loading',
    });
    const currentGroup = state.group;
    const response = await httpClient.patch<IPaymentGroup>(
      `/equivalent-value/groups/${currentGroup._id}`,
      {
        payments: [
          ...currentGroup.payments,
          payment,
        ],
      },
    );
    dispatch({
      type: '[EquivalenceGroup] Loaded',
      group: response.data,
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
