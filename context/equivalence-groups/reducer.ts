import { Reducer } from 'react';

import { EquivalenceGroupsState } from './state';
import { EquivalenceGroupsAction } from './actions';

export const reducer: Reducer<EquivalenceGroupsState, EquivalenceGroupsAction> = (state, action) => {
  switch (action.type) {
    case '[EquivalenceGroups] Loading': {
      return {
        loading: true,
        groupsPage: undefined,
        error: undefined,
      };
    }
    case '[EquivalenceGroups] Loaded': {
      return {
        loading: false,
        groupsPage: action.groupsPage,
        error: undefined,
      };
    }
    case '[EquivalenceGroups] Failed Load': {
      return {
        loading: false,
        groupsPage: undefined,
        error: action.error,
      };
    }
  }
}