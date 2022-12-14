import { prop, modelOptions } from '@typegoose/typegoose';

import { IPaymentType, IPaymentTypeUtils } from '../../interfaces/payment-type';
import { PaymentImagesValidationSchema } from '../../validation-schemas/payment';

const paymentImagesValidator = {
  validator: (v: string[]) => {
    const result = PaymentImagesValidationSchema.safeParse(v);
    return result.success;
  },
  message: 'The payment images are not valid URLs',
};

@modelOptions({
  schemaOptions: {
    _id: false,
    discriminatorKey: 'type',
  },
})
export class Payment {
  @prop({
    required: true,
    minlength: 1,
    trim: true,
  })
  name!: string;

  @prop({
    required: true,
    min: 0,
  })
  position!: number;

  @prop({
    required: true,
    type: String,
    enum: IPaymentTypeUtils.VALUES,
  })
  readonly type!: typeof IPaymentType;

  @prop({
    required: true,
    type: () => [String],
    default: [],
    validate: [
      paymentImagesValidator,
    ],
  })
  images!: string[];
}

export class SinglePayment extends Payment {
  @prop({
    required: true,
  })
  amount!: number;
}

export class UniformSeriesPayment extends Payment {
  @prop({
    required: true,
  })
  periodicAmount!: number;

  @prop({
    required: true,
    min: 1,
  })
  periods!: number;
}

export const paymentDiscriminators = [
  { type: SinglePayment, value: IPaymentType.single },
  { type: UniformSeriesPayment, value: IPaymentType.uniformSeries },
];
