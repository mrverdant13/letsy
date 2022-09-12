import { FC, Reducer, useReducer } from "react";

import { EquivalentValueState, reducer } from './equivalentValueReducer';
import { EquivalentValueContext } from './EquivalentValueContext';
import { IPayment, ISinglePayment } from '../../interfaces/payment';
import httpClient from '../../apis/_client';
import { EquivalentValueAction } from "./actions";

interface Props {
  children: React.ReactNode;
}

const INITIAL_STATE: EquivalentValueState = {
  computing: false,
  group: {
    name: 'Untitled',
    payments: [
    ],
  },
};

export const EquivalentValueProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalentValueState, EquivalentValueAction>>(
    reducer,
    INITIAL_STATE,
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
