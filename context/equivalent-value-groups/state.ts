import { CreatePaymentGroupError } from './errors';

export interface EquivalentValueGroupsState {
  creating: boolean;
  groupId?: string;
  error?: CreatePaymentGroupError;
}

export const INITIAL_STATE: EquivalentValueGroupsState = {
  creating: false,
};
