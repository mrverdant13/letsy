import { z } from 'zod';

import { PaymentGroupValidationSchema } from '../validation-schemas/payment-group';

export type IPaymentGroup = z.infer<typeof PaymentGroupValidationSchema>;