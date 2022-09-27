import { ReactNode, FC, useReducer, Reducer, useCallback } from 'react';

import { EquivalenceGroupsState, INITIAL_STATE } from './state';
import { EquivalenceGroupsAction } from './actions';
import { reducer } from './reducer';
import { EquivalenceGroupsContext } from './context';
import httpClient from '../../apis/_client';
import { IPaymentGroupsPage, IPaymentGroup } from '../../interfaces/payment-group';
import { PaginationParams } from '../../interfaces/pagination-params';
import { buildQueryString } from '../../utils/url';

interface Props {
  children: ReactNode;
}

export const EquivalenceGroupsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalenceGroupsState, EquivalenceGroupsAction>>(
    reducer,
    INITIAL_STATE,
  );

  const getGroups = useCallback(
    async (paginationParams: PaginationParams) => {
      dispatch({
        type: '[EquivalenceGroups] Loading',
      });
      try {
        const queryString = buildQueryString(paginationParams);
        const response = await httpClient.get<IPaymentGroupsPage>(
          `/equivalent-value/groups?${queryString}`,
        );
        dispatch({
          type: '[EquivalenceGroups] Loaded',
          groupsPage: response.data,
        });
      } catch (e) {
        dispatch({
          type: '[EquivalenceGroups] Failed Load',
          error: { code: 'unexpected' },
        });
      }
    },
    [],
  );

  const deleteGroup = async (groupId: string) => {
    const groupsPage = state.groupsPage;
    if (groupsPage == undefined) return;
    const groups = groupsPage.groups;
    const containsGroup = groups.some(g => g._id === groupId);
    if (!containsGroup) return;
    dispatch({
      type: '[EquivalenceGroups] Loading',
    });
    try {
      const response = await httpClient.delete<IPaymentGroup>(
        `/equivalent-value/groups/${groupId}`,
      );
      dispatch({
        type: '[EquivalenceGroups] Loaded',
        groupsPage: {
          ...groupsPage,
          groups: groups.filter(
            (g) => g._id !== groupId
          ),
        },
      });
    } catch (e) {
      dispatch({
        type: '[EquivalenceGroups] Failed Load',
        error: { code: 'unexpected' },
      });
    }
  }

  const renameGroup = async (groupId: string, newName: string) => {
    const groupsPage = state.groupsPage;
    if (groupsPage == undefined) return;
    const groups = groupsPage.groups;
    const containsGroup = groups.some(g => g._id === groupId);
    if (!containsGroup) return;
    dispatch({
      type: '[EquivalenceGroups] Loading',
    });
    try {
      const response = await httpClient.patch<IPaymentGroup>(
        `/equivalent-value/groups/${groupId}`,
        { name: newName },
      );
      dispatch({
        type: '[EquivalenceGroups] Loaded',
        groupsPage: {
          count: groupsPage.count - 1,
          groups: groups.map(
            (g) =>
              g._id === groupId
                ? response.data
                : g,
          ),
        },
      });
    } catch (e) {
      dispatch({
        type: '[EquivalenceGroups] Failed Load',
        error: { code: 'unexpected' },
      });
    }
  }

  return (
    <EquivalenceGroupsContext.Provider
      value={{
        ...state,
        getGroups,
        renameGroup,
        deleteGroup,
      }}
    >
      {children}
    </EquivalenceGroupsContext.Provider>
  );
}
