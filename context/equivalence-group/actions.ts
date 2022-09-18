import { IPaymentGroup } from '../../interfaces/payment-group';
import { Error } from './errors';

type LoadingAction = {
  type: '[EquivalenceGroup] Loading';
};

type LoadedAction = {
  type: '[EquivalenceGroup] Loaded';
  group: IPaymentGroup;
};

type AddErrorAction = {
  type: '[EquivalenceGroup] Add Errors';
  errors: Error[];
}

export type EquivalenceGroupAction =
  | LoadingAction
  | LoadedAction
  | AddErrorAction
  ;
