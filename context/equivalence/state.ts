import { ISinglePayment } from '../../interfaces/payment';
import { EquivalenceError } from './errors';

export interface EquivalenceState {
  loading: boolean;
  equivalentPayment?: ISinglePayment;
  error?: EquivalenceError;
};
