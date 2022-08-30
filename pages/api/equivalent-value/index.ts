import type { NextApiRequest, NextApiResponse } from 'next'

import { ISinglePayment } from '../../../interfaces/payment';
import { IPaymentGroup } from '../../../interfaces/payment-group'
import { calculateEquivalentValue } from '../../../services/payments.service';

type Data =
  | ISinglePayment
  | { message: string }


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(404).json({ message: 'Method not allowed' });
  const { group, targetPosition }: { group: IPaymentGroup, targetPosition: number } = req.body;
  const paymentAtTheEnd: ISinglePayment = calculateEquivalentValue(
    group,
    targetPosition,
  );
  res.status(200).json(paymentAtTheEnd);
}