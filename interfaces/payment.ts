import { z } from 'zod';

import { SinglePaymentValidationSchema, UniformSeriesPaymentValidationSchema, PaymentValidationSchema } from '../validation-schemas/payment';

export type ISinglePayment = z.infer<typeof SinglePaymentValidationSchema>;
export type IUniformSeriesPayment = z.infer<typeof UniformSeriesPaymentValidationSchema>;
export type IPayment = z.infer<typeof PaymentValidationSchema>;
