import { IPaymentGroup } from '../../interfaces/payment-group';

type AddingPaymentAction = {
  type: '[EquivalenceGroup] Adding Payment';
};

type AddedPaymentAction = {
  type: '[EquivalenceGroup] Added Payment';
  group: IPaymentGroup;
};

export type EquivalenceGroupAction =
  | AddingPaymentAction
  | AddedPaymentAction
  ;
