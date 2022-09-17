import { z } from 'zod';

import { PaymentGroupValidationSchema, NewPaymentGroupValidationSchema, UpdatedPaymentGroupValidationSchema } from '../validation-schemas/payment-group';

export type IPaymentGroup = z.infer<typeof PaymentGroupValidationSchema>;
export type INewPaymentGroup = z.infer<typeof NewPaymentGroupValidationSchema>;
export type IUpdatedPaymentGroup = z.infer<typeof UpdatedPaymentGroupValidationSchema>;

export type IPaymentGroupsPage = {
  groups: IPaymentGroup[];
  count: number;
};

