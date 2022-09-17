import { IPaymentGroup } from '../../interfaces/payment-group';
import { Error } from './errors';

export interface EquivalenceGroupState {
  group: IPaymentGroup;
  loading: boolean;
  errors: Error[];
}
