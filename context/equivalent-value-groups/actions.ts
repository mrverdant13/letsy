import { CreatePaymentGroupError } from './errors';

type ResetAction = {
  type: '[EquivalentValueGroups] Reset';
};

type CreatingAction = {
  type: '[EquivalentValueGroups] Creating';
};

type CreatedAction = {
  type: '[EquivalentValueGroups] Created';
  groupId: string;
};

type FailedCreationAction = {
  type: '[EquivalentValueGroups] Failed Creation';
  error: CreatePaymentGroupError
}

export type EquivalentValueGroupsAction =
  | ResetAction
  | CreatingAction
  | CreatedAction
  | FailedCreationAction
  ;