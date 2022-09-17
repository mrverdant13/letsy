import { ReactNode, FC, useReducer, Reducer } from 'react';

import { EquivalenceGroupsState, INITIAL_STATE } from './state';
import { EquivalenceGroupsAction } from './actions';
import { reducer } from './reducer';
import { EquivalenceGroupsContext } from './context';
import httpClient from '../../apis/_client';
import { IPaymentGroupsPage } from '../../interfaces/payment-group';
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

  const getGroups = async (paginationParams: PaginationParams) => {
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
  };

  return (
    <EquivalenceGroupsContext.Provider
      value={{
        ...state,
        getGroups,
      }}
    >
      {children}
    </EquivalenceGroupsContext.Provider>
  );
}
