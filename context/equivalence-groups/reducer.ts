import { Reducer } from 'react';

import { EquivalenceGroupsState } from './state';
import { EquivalenceGroupsAction } from './actions';

export const reducer: Reducer<EquivalenceGroupsState, EquivalenceGroupsAction> = (state, action) => {
  switch (action.type) {
    case '[EquivalenceGroups] Loading': {
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    }
    case '[EquivalenceGroups] Loaded': {
      return {
        loading: false,
        groups: action.groups,
        error: undefined,
      };
    }
    case '[EquivalenceGroups] Failed Load': {
      return {
        loading: false,
        groups: undefined,
        error: action.error,
      };
    }
  }
}