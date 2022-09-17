import { FC, Reducer, useReducer } from "react";

import { EquivalentValueState, reducer } from './equivalentValueReducer';
import { EquivalentValueContext } from './EquivalentValueContext';
import { IPayment, ISinglePayment } from '../../interfaces/payment';
import httpClient from '../../apis/_client';
import { EquivalentValueAction } from "./actions";
import { IPaymentGroup } from '../../interfaces/payment-group';

interface Props {
  children: React.ReactNode;
  initialGroup: IPaymentGroup;
}

export const EquivalentValueProvider: FC<Props> = ({ children, initialGroup }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalentValueState, EquivalentValueAction>>(
    reducer,
    {
      computing: false,
      group: initialGroup,
    },
  );

  const updatePayment = (name: string, payment: IPayment) => {
    dispatch({
      type: "[EquivalentValue] Update Payment",
      name,
      payment,
    });;
  };

  const setInterest = (interest: number) => {
    dispatch({
      type: "[EquivalentValue] Set Interest",
      interest,
    });
  }

  const computeEquivalentValue = async (
    targetPeriod: number,
  ): Promise<void> => {
    dispatch({
      type: "[EquivalentValue] Computing Equivalent Payment",
    });
    try {
      const response = await httpClient.post<ISinglePayment>(
        '/equivalent-value',
        {
          group: {
            ...state.group,
            interest: state.group.interest! / 100,
          },
          targetPosition: targetPeriod,
        },
      );
      const equivalentPayment: ISinglePayment = response.data;
      dispatch({
        type: "[EquivalentValue] Computed Equivalent Payment",
        equivalentPayment,
      });
    } catch (e) {
      dispatch({
        type: "[EquivalentValue] Set Compute Equivalent Payment Error",
        error: { code: 'unexpected' },
      });
    }
  }

  return (
    <EquivalentValueContext.Provider value={{
      ...state,
      updatePayment,
      setInterest,
      computeEquivalentValue,
    }}>
      {children}
    </EquivalentValueContext.Provider>
  )
}
