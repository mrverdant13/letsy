import { Reducer } from 'react';

import { EquivalentValueGroupsState, INITIAL_STATE } from './state';
import { EquivalentValueGroupsAction } from './actions';

export const reducer: Reducer<EquivalentValueGroupsState, EquivalentValueGroupsAction> = (state, action) => {
  switch (action.type) {
    case '[EquivalentValueGroups] Reset': {
      return {
        ...INITIAL_STATE,
      };
    }
    case '[EquivalentValueGroups] Creating': {
      return {
        groupId: undefined,
        creating: true,
        error: undefined,
      };
    }
    case '[EquivalentValueGroups] Created': {
      return {
        groupId: action.groupId,
        creating: false,
        error: undefined,
      };
    }
    case '[EquivalentValueGroups] Failed Creation': {
      return {
        groupId: undefined,
        creating: false,
        error: action.error,
      };
    }
  }
}
