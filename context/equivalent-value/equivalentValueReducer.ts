import { Reducer } from "react";

import { IPaymentGroup, IPaymentGroupWithOptionalInterest } from '../../interfaces/payment-group';
import { IPayment, ISinglePayment } from '../../interfaces/payment';
import { EquivalentValueAction } from "./actions";
import { ComputeEquivalentValueError } from "./errors";

export interface EquivalentValueState {
  computing: boolean;
  computeEquivalentValueError?: ComputeEquivalentValueError;
  group: IPaymentGroupWithOptionalInterest;
  equivalentPayment?: ISinglePayment;
}

export const reducer: Reducer<EquivalentValueState, EquivalentValueAction> = (state, action) => {
  switch (action.type) {
    case '[EquivalentValue] Update Payment': {
      const paymentName = action.name;
      const updatedPayment = action.payment;
      const currentGroup = state.group;
      const currentPayments = currentGroup.payments;
      const resultingGroup: IPaymentGroupWithOptionalInterest = {
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
        setInterestError: undefined,
        group: resultingGroup,
      };
    }
    case '[EquivalentValue] Computing Equivalent Payment': {
      return {
        ...state,
        computing: true,
        computeEquivalentValueError: undefined,
        equivalentPayment: undefined,
      };
    }
    case '[EquivalentValue] Computed Equivalent Payment': {
      return {
        ...state,
        computing: false,
        computeEquivalentValueError: undefined,
        equivalentPayment: action.equivalentPayment,
      };
    }
    case '[EquivalentValue] Set Compute Equivalent Payment Error': {
      return {
        ...state,
        computing: false,
        computeEquivalentValueError: action.error,
        equivalentPayment: undefined,
      };
    }
  }
}