import { Reducer } from 'react';

import { EquivalenceState } from './state';
import { EquivalenceAction } from './actions';

export const reducer: Reducer<EquivalenceState, EquivalenceAction> = (state, action) => {
  switch (action.type) {
    case '[Equivalence] Reset': {
      return {
        loading: false,
        equivalentPayment: undefined,
        error: undefined,
      }
    }
    case '[Equivalence] Loading': {
      return {
        loading: true,
        equivalentPayment: undefined,
        error: undefined,
      }
    }
    case '[Equivalence] Loaded': {
      return {
        loading: false,
        equivalentPayment: action.equivalentPayment,
        error: undefined,
      }
    }
    case '[Equivalence] Add Error': {
      return {
        loading: false,
        equivalentPayment: undefined,
        error: action.error,
      }
    }
  }
}
