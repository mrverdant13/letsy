import { createContext, useContext } from 'react';

import { EquivalenceGroupsState } from './state';
import { PaginationParams } from '../../interfaces/pagination-params';

type CtxProps =
  & EquivalenceGroupsState
  & {
    getGroups: (paginationParams: PaginationParams) => Promise<void>;
    renameGroup: (groupId: string, newName: string) => Promise<void>;
    deleteGroup: (groupId: string) => Promise<void>;
  }
  ;

export const EquivalenceGroupsContext = createContext<CtxProps>({} as CtxProps);
export const useEquivalenceGroupsContext = () => useContext<CtxProps>(EquivalenceGroupsContext);
