import { FC, ReactNode, useReducer, Reducer, useCallback } from 'react';

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
      errors: [],
    },
  );

  const addPayment = async (payment: IPayment) => {
    if (state.loading) return;
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

  const updateName = async (name: string) => {
    if (state.loading) return;
    dispatch({
      type: '[EquivalenceGroup] Loading',
    });
    const groupId = state.group._id;
    const response = await httpClient.patch<IPaymentGroup>(
      `/equivalent-value/groups/${groupId}`,
      { name },
    );
    dispatch({
      type: '[EquivalenceGroup] Loaded',
      group: response.data,
    });
  }

  const updateInterest = useCallback(
    async (interest: number) => {
      if (state.loading) return;
      dispatch({
        type: '[EquivalenceGroup] Loading',
      });
      const groupId = state.group._id;
      const response = await httpClient.patch<IPaymentGroup>(
        `/equivalent-value/groups/${groupId}`,
        { interest },
      );
      dispatch({
        type: '[EquivalenceGroup] Loaded',
        group: response.data,
      });
    },
    [state.group._id, state.loading],
  );

  const updatePayment = async (name: string, payment: IPayment) => {
    if (state.loading) return;
    dispatch({
      type: '[EquivalenceGroup] Loading',
    });
    const group = state.group;
    const groupId = group._id;
    const payments = group.payments;
    const response = await httpClient.patch<IPaymentGroup>(
      `/equivalent-value/groups/${groupId}`,
      {
        payments: payments.map(
          p =>
            p.name == name
              ? payment
              : p,
        ),
      },
    );
    dispatch({
      type: '[EquivalenceGroup] Loaded',
      group: response.data,
    });
  }

  const deletePayment = async (name: string) => {
    if (state.loading) return;
    dispatch({
      type: '[EquivalenceGroup] Loading',
    });
    const group = state.group;
    const groupId = group._id;
    const payments = group.payments;
    const response = await httpClient.patch<IPaymentGroup>(
      `/equivalent-value/groups/${groupId}`,
      {
        payments: payments.filter(p => p.name !== name),
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
        updateName,
        updateInterest,
        updatePayment,
        deletePayment,
      }}
    >
      {children}
    </EquivalenceGroupContext.Provider>
  );
}
