import { IPaymentGroup, INewPaymentGroup } from '../interfaces/payment-group';
import { PaymentGroupModel } from '../database/models/payment-group';
import { db } from '../database';

export const createEquivalentValuePaymentGroup = async (
  group: INewPaymentGroup,
): Promise<IPaymentGroup> => {
  await db.connect();
  return PaymentGroupModel.create(group);
};