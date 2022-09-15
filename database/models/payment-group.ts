import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';

import { IPayment } from '../../interfaces/payment';
import { Payment, paymentDiscriminators } from './payment';
import { GenericPaymentGroupPaymentsValidationSchema } from '../../validation-schemas/payment-group';
import { User } from './user';

const uniquePaymentNamesValidator = {
  validator: (v: Payment[]) => {
    const result = GenericPaymentGroupPaymentsValidationSchema.safeParse(v);
    return result.success;
  },
  message: 'A payment group must hold payments with unique names',
};

@modelOptions({
  schemaOptions: {
    collection: 'payment-groups',
  },
})
export class PaymentGroup {
  @prop({
    required: true,
    ref: () => User,
  })
  owner!: Ref<User>;

  @prop({
    required: true,
    minlength: 1,
    trim: true,
  })
  name!: string;

  @prop({
    required: true,
    type: Payment,
    discriminators: () => paymentDiscriminators,
    default: [],
    validate: [
      uniquePaymentNamesValidator,
    ],
  })
  payments!: IPayment[];

  @prop({
    required: true,
    min: 0,
  })
  interest!: number;
}

export const PaymentGroupModel = getModelForClass(PaymentGroup);
