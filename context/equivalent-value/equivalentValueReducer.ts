import { Reducer } from "react";

import { IPaymentGroup } from "../../interfaces/payment-group";
import { IPayment } from '../../interfaces/payment';

type UpdatePaymentAction = {
  type: '[EquivalentValue] Update Payment',
  name: string;
  payment: IPayment;
};

type SetInterestAction = {
  type: '[EquivalentValue] Set Interest',
  interest: number;
};

export type EquivalentValueAction =
  | UpdatePaymentAction
  | SetInterestAction
  ;

export type EquivalentValueError =
  | 'unexpected'
  ;

export interface EquivalentValueState {
  loading: boolean;
  errorCode?: EquivalentValueError;
  group: IPaymentGroup;
  amount?: number;
}

export const reducer: Reducer<EquivalentValueState, EquivalentValueAction> = (state, action) => {
  switch (action.type) {
    case '[EquivalentValue] Update Payment': {
      const paymentName = action.name;
      const updatedPayment = action.payment;
      const currentGroup = state.group;
      const currentPayments = currentGroup.payments;
      const resultingGroup: IPaymentGroup = {
        ...currentGroup,
        payments: currentPayments.map(
          p =>
            p.name === paymentName
              ? updatedPayment
              : p,
        ),
      };
      return {
        ...state,
        group: resultingGroup,
      };
    }
    case '[EquivalentValue] Set Interest': {
      const resultingGroup: IPaymentGroup = {
        ...state.group,
        interest: action.interest,
      };
      return {
        ...state,
        group: resultingGroup,
      };
    }
  }
}