import { IPaymentGroup, IPaymentGroupsPage } from '../../interfaces/payment-group';
import { LoadGroupsError } from './errors';

export interface EquivalenceGroupsState {
  loading: boolean;
  groupsPage?: IPaymentGroupsPage;
  error?: LoadGroupsError;
}

export const INITIAL_STATE: EquivalenceGroupsState = {
  loading: false,
};
