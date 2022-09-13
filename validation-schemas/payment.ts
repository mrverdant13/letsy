import { z } from 'zod';

import { IPaymentType } from '../interfaces/payment-type';
import { PaymentTypeValidationSchema } from './payment-type';
import { PositionValidationSchema } from './positions';

const BasePaymentValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Invalid name'
    })
    .trim()
    .min(
      1,
      {
        message: 'Name is required',
      },
    ),
  position: PositionValidationSchema('Position'),
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
      })
      .positive(
        'The amount must be a positive number',
      ),
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
      })
      .positive(
        'The periodic amount must be positive number',
      ),
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
