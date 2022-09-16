import { CreatePaymentGroupError } from './errors';

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
  | CreatingAction
  | CreatedAction
  | FailedCreationAction
  ;