import { z } from 'zod';

import { PaymentGroupValidationSchema, PaymentGroupWithOptionalInterestValidationSchema } from '../validation-schemas/payment-group';

export type IPaymentGroup = z.infer<typeof PaymentGroupValidationSchema>;

export type IPaymentGroupWithOptionalInterest = z.infer<typeof PaymentGroupWithOptionalInterestValidationSchema>;
