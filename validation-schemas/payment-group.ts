import { z } from 'zod';

import { PaymentValidationSchema } from './payment';
import { InterestValidationSchema } from './interests';

export const PaymentGroupValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Invalid name',
    })
    .trim()
    .min(
      1,
      {
        message: 'Name is required',
      },
    ),
  payments: z
    .array(PaymentValidationSchema)
    .refine(
      (payments) => {
        const names = payments.map(p => p.name);
        const uniqueNames = new Set([...names]);
        return uniqueNames.size === names.length;
      },
    ),
  interest: InterestValidationSchema,
});

export const PaymentGroupWithOptionalInterestValidationSchema = PaymentGroupValidationSchema
  .partial({
    interest: true,
  });