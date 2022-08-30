import { z } from 'zod';

import { IPaymentType } from '../interfaces/payment-type';

export const PaymentTypeValidationSchema = z.nativeEnum(IPaymentType);