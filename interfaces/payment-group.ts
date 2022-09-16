import { z } from 'zod';

import { PaymentGroupValidationSchema, PaymentGroupWithOptionalInterestValidationSchema, NewPaymentGroupValidationSchema } from '../validation-schemas/payment-group';

export type IPaymentGroup = z.infer<typeof PaymentGroupValidationSchema>;
export type INewPaymentGroup = z.infer<typeof NewPaymentGroupValidationSchema>;

export type IPaymentGroupWithOptionalInterest = z.infer<typeof PaymentGroupWithOptionalInterestValidationSchema>;
