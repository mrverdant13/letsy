import { FC, Reducer, useReducer } from "react";

import { EquivalentValueAction, EquivalentValueState, reducer } from './equivalentValueReducer';
import { EquivalentValueContext } from './EquivalentValueContext';
import { IPayment } from "../../interfaces/payment";

interface Props {
  children: React.ReactNode;
}

const INITIAL_STATE: EquivalentValueState = {
  loading: false,
  group: {
    name: 'Untitled',
    payments: [],
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

  return (
    <EquivalentValueContext.Provider value={{
      ...state,
      updatePayment,
    }}>
      {children}
    </EquivalentValueContext.Provider>
  )
}
