import { ReactNode, FC, useReducer, Reducer } from 'react';

import { reducer } from './reducer';
import { INITIAL_STATE, EquivalentValueGroupsState } from './state';
import { EquivalentValueGroupsAction } from './actions';
import { EquivalentValueGroupsContext } from './context';
import httpClient from '../../apis/_client';
import { IPaymentGroup, INewPaymentGroup } from '../../interfaces/payment-group';

interface Props {
  children: ReactNode;
}

export const EquivalentValueGroupsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<EquivalentValueGroupsState, EquivalentValueGroupsAction>>(
    reducer,
    INITIAL_STATE,
  );

  const createGroup = async (
    name: string,
  ): Promise<void> => {
    dispatch({
      type: '[EquivalentValueGroups] Creating',
    });
    try {
      const newGroup: INewPaymentGroup = {
        name,
        interest: 0.0,
        payments: [],
      };
      const response = await httpClient.post<IPaymentGroup>(
        '/equivalent-value/groups',
        newGroup,
      );
      const createdGroup = response.data;
      dispatch({
        type: '[EquivalentValueGroups] Created',
        groupId: createdGroup._id,
      });
    } catch (e) {
      dispatch({
        type: '[EquivalentValueGroups] Failed Creation',
        error: { code: 'unexpected' },
      });
    }
  }

  return (
    <EquivalentValueGroupsContext.Provider
      value={{
        ...state,
        createGroup,
      }}
    >
      {children}
    </EquivalentValueGroupsContext.Provider>
  );
}