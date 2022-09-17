import { Reducer } from 'react';
import { EquivalenceGroupState } from './state';
import { EquivalenceGroupAction } from './actions';

export const reducer: Reducer<EquivalenceGroupState, EquivalenceGroupAction> = (state, action) => {
  switch (action.type) {
    case '[EquivalenceGroup] Loading': {
      return {
        ...state,
        loading: true,
      };
    }
    case '[EquivalenceGroup] Loaded': {
      return {
        ...state,
        loading: false,
        group: action.group,
      };
    }
  }
}
