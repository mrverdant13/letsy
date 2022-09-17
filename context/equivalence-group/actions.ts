import { IPaymentGroup } from '../../interfaces/payment-group';

type LoadingAction = {
  type: '[EquivalenceGroup] Loading';
};

type LoadedAction = {
  type: '[EquivalenceGroup] Loaded';
  group: IPaymentGroup;
};

export type EquivalenceGroupAction =
  | LoadingAction
  | LoadedAction
  ;
