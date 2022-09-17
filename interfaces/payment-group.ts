import { z } from 'zod';

import { PaymentGroupValidationSchema, NewPaymentGroupValidationSchema } from '../validation-schemas/payment-group';

export type IPaymentGroup = z.infer<typeof PaymentGroupValidationSchema>;
export type INewPaymentGroup = z.infer<typeof NewPaymentGroupValidationSchema>;

export type IPaymentGroupsPage = {
  groups: IPaymentGroup[];
  count: number;
};

