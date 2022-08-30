import { z } from 'zod';

import { PaymentValidationSchema } from './payment';

export const PaymentGroupValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Invalid name',
    }).min(
      1,
      {
        message: 'Name is required',
      },
    ),
  payments: z
    .array(PaymentValidationSchema),
  interest: z
    .number({
      required_error: 'Interest is required',
      invalid_type_error: 'Interest must be a number',
    })
    .positive(
      'Interest must be a positive number',
    )
    .optional(),
});