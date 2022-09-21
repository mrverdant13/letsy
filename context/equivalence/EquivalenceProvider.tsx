import { ReactNode, FC, useReducer, Reducer } from 'react';

import { EquivalenceState } from './state';
import { EquivalenceAction } from './actions';
import { reducer } from './reducer';
import { EquivalenceContext } from './context';
import httpClient from '../../apis/_client';
import { ISinglePayment } from '../../interfaces/payment';
import { IPaymentGroup } from '../../interfaces/payment-group';

interface Props {
  children: ReactNode[] | ReactNode;
}

export const EquivalenceProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalenceState, EquivalenceAction>>(
    reducer,
    {
      loading: false,
    },
  );

  const reset = () => {
    dispatch({
      type: '[Equivalence] Reset',
    });
  }

  const computeEquivalence = async (
    group: IPaymentGroup,
    targetPeriod: number,
  ): Promise<void> => {
    dispatch({
      type: "[Equivalence] Loading",
    });
    try {
      const response = await httpClient.post<ISinglePayment>(
        '/equivalent-value',
        {
          group,
          targetPosition: targetPeriod,
        },
      );
      const equivalentPayment: ISinglePayment = response.data;
      dispatch({
        type: "[Equivalence] Loaded",
        equivalentPayment,
      });
    } catch (e) {
      dispatch({
        type: "[Equivalence] Add Error",
        error: { code: 'unexpected' },
      });
    }
  }


  return (
    <EquivalenceContext.Provider
      value={{
        ...state,
        computeEquivalence,
      }}
    >
      {children}
    </EquivalenceContext.Provider>
  )
}
