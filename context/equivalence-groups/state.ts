import { IPaymentGroup } from '../../interfaces/payment-group';
import { LoadGroupsError } from './errors';

export interface EquivalenceGroupsState {
  loading: boolean;
  groups?: IPaymentGroup[];
  error?: LoadGroupsError;
}

export const INITIAL_STATE: EquivalenceGroupsState = {
  loading: false,
};
