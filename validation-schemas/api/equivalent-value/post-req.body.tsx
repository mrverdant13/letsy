import { z } from 'zod';

import { PaymentGroupValidationSchema } from '../../payment-group';
import { PositionValidationSchema } from '../../positions';

export const PostReqBodyValidationSchema = z.object({
  group: PaymentGroupValidationSchema,
  targetPosition: PositionValidationSchema('Target position'),
});
