import { z } from 'zod';
import mongoose from 'mongoose';

import { PaymentValidationSchema } from './payment';
import { InterestValidationSchema } from './interests';
import { ObjectIdStringValidationSchema } from './object-id';

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

export const GenericPaymentGroupPaymentsValidationSchema = PaymentGroupPaymentsValidationSchemaBuilder(true);
export const SpecificPaymentGroupPaymentsValidationSchema = PaymentGroupPaymentsValidationSchemaBuilder(false);

export const PaymentGroupNameValidationSchema = z
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
  );

export const PaymentGroupValidationSchema = z.object({
  _id: ObjectIdStringValidationSchema(),
  owner: ObjectIdStringValidationSchema('owner ID'),
  name: PaymentGroupNameValidationSchema,
  payments: GenericPaymentGroupPaymentsValidationSchema,
  interest: InterestValidationSchema,
});

export const NewPaymentGroupValidationSchema = PaymentGroupValidationSchema
  .omit({
    _id: true,
    owner: true,
  });

export const UpdatedPaymentGroupValidationSchema = NewPaymentGroupValidationSchema.partial();