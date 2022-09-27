import type { NextApiRequest, NextApiResponse } from 'next'

import { ISinglePayment } from '../../../interfaces/payment';
import { calculateEquivalentValue } from '../../../services/payments.service';
import { PostReqBodyValidationSchema } from '../../../validation-schemas/api/equivalent-value/post-req.body';

type Data =
  | ISinglePayment
  | { message: string }


export default function endpoint(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const result = PostReqBodyValidationSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid data' });
  const { group, targetPosition } = result.data;
  const paymentAtTheEnd: ISinglePayment = calculateEquivalentValue(
    group,
    targetPosition,
  );
  res.status(200).json(paymentAtTheEnd);
}
