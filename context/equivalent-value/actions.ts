import { IPayment, ISinglePayment } from "../../interfaces/payment";
import { ComputeEquivalentValueError } from './errors';

type UpdatePaymentAction = {
  type: '[EquivalentValue] Update Payment',
  name: string;
  payment: IPayment;
};

type SetInterestAction = {
  type: '[EquivalentValue] Set Interest',
  interest: number;
};

type ComputingEquivalentPaymentAction = {
  type: '[EquivalentValue] Computing Equivalent Payment',
};

type ComputedEquivalentPaymentAction = {
  type: '[EquivalentValue] Computed Equivalent Payment',
  equivalentPayment: ISinglePayment;
};

type SetComputeEquivalentPaymentErrorAction = {
  type: '[EquivalentValue] Set Compute Equivalent Payment Error',
  error: ComputeEquivalentValueError,
};

export type EquivalentValueAction =
  | UpdatePaymentAction
  | SetInterestAction
  | ComputingEquivalentPaymentAction
  | ComputedEquivalentPaymentAction
  | SetComputeEquivalentPaymentErrorAction
  ;

