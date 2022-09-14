import { z } from 'zod';

import { PaymentValidationSchema } from './payment';
import { InterestValidationSchema } from './interests';

const PaymentGroupPaymentsValidationSchemaBuilder = (isGeneric: boolean) => z
  .array(PaymentValidationSchema)
  .refine(
    (payments) => {
      const names = payments.map(p => p.name);
      const uniqueNames = new Set([...names]);
      return uniqueNames.size === names.length;
    },
    {
      message:
        isGeneric
          ? 'The payment names should not be duplicated'
          : `Payment name already in use`,
    },
  );

const GenericPaymentGroupPaymentsValidationSchema = PaymentGroupPaymentsValidationSchemaBuilder(true);
export const SpecificPaymentGroupPaymentsValidationSchema = PaymentGroupPaymentsValidationSchemaBuilder(false);

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
  payments: GenericPaymentGroupPaymentsValidationSchema,
  interest: InterestValidationSchema,
});

export const PaymentGroupWithOptionalInterestValidationSchema = PaymentGroupValidationSchema
  .partial({
    interest: true,
  });