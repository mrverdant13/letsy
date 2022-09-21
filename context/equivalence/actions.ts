import { ISinglePayment } from '../../interfaces/payment';
import { EquivalenceError } from './errors';

type ResetAction = {
  type: '[Equivalence] Reset';
};

type LoadingAction = {
  type: '[Equivalence] Loading';
};

type LoadedAction = {
  type: '[Equivalence] Loaded';
  equivalentPayment: ISinglePayment;
};

type AddErrorAction = {
  type: '[Equivalence] Add Error';
  error: EquivalenceError;
};

export type EquivalenceAction =
  | ResetAction
  | LoadingAction
  | LoadedAction
  | AddErrorAction
  ;

