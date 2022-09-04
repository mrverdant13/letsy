import { z } from 'zod';

import { IPaymentType } from '../interfaces/payment-type';
import { PaymentTypeValidationSchema } from './payment-type';

const BasePaymentValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Invalid name'
    })
    .min(
      1,
      {
        message: 'Name is required',
      },
    ),
  position: z
    .number({
      required_error: 'Position is required',
      invalid_type_error: 'Position must be a number'
    })
    .int(
      'Position must be a non-negative integer',
    )
    .nonnegative(
      'Position must be a non-negative integer',
    ),
  type: PaymentTypeValidationSchema,
});

export const SinglePaymentValidationSchema = BasePaymentValidationSchema.merge(
  z.object({
    type: z
      .literal(IPaymentType.single),
    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      }),
  }),
);

export const UniformSeriesPaymentValidationSchema = BasePaymentValidationSchema.merge(
  z.object({
    type: z
      .literal(IPaymentType.uniformSeries),
    periodicAmount: z
      .number({
        required_error: 'Periodic amount is required',
        invalid_type_error: 'Periodic amount must be a number',
      }),
    periods: z
      .number({
        required_error: 'Periods is required',
        invalid_type_error: 'Periods must be a number'
      })
      .int(
        'Periods must be a positive integer',
      )
      .positive(
        'Periods must be a positive integer',
      ),
  }),
);

export const PaymentValidationSchema = z.discriminatedUnion(
  'type',
  [
    BasePaymentValidationSchema.merge(SinglePaymentValidationSchema),
    BasePaymentValidationSchema.merge(UniformSeriesPaymentValidationSchema),
  ],
);
