import { IPaymentGroupsPage } from '../../interfaces/payment-group';
import { LoadGroupsError } from './errors';

type LoadingGroupsAction = {
  type: '[EquivalenceGroups] Loading';
};

type LoadedGroupsAction = {
  type: '[EquivalenceGroups] Loaded';
  groupsPage: IPaymentGroupsPage;
};

type FailedLoadGroupsAction = {
  type: '[EquivalenceGroups] Failed Load';
  error: LoadGroupsError;
};

export type EquivalenceGroupsAction =
  | LoadingGroupsAction
  | LoadedGroupsAction
  | FailedLoadGroupsAction
  ;
