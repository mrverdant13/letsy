import { Reducer } from 'react';
import { EquivalenceGroupState } from './state';
import { EquivalenceGroupAction } from './actions';

export const reducer: Reducer<EquivalenceGroupState, EquivalenceGroupAction> = (state, action) => {
  switch (action.type) {
    case '[EquivalenceGroup] Adding Payment': {
      return {
        ...state,
        addingPayment: true,
      };
    }
    case '[EquivalenceGroup] Added Payment': {
      return {
        ...state,
        addingPayment: false,
        group: action.group,
      };
    }
  }
}
