import type { NextApiRequest, NextApiResponse } from 'next'

import { MethodNotAllowedResponse } from '../../../interfaces/api/method-not-allowed-response';
import { NewPaymentGroupValidationSchema } from '../../../validation-schemas/payment-group';
import { INewPaymentGroup, IPaymentGroup } from '../../../interfaces/payment-group';
import { BadRequestWithInvalidDataResponse } from '../../../interfaces/api/bad-request-response';
import { createEquivalentValuePaymentGroup } from '../../../services/equivalent-value.service';

type CreateEquivalentValueGroup =
  | BadRequestWithInvalidDataResponse
  | IPaymentGroup
  ;

type Data =
  | MethodNotAllowedResponse
  | CreateEquivalentValueGroup
  ;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return post(req, res);
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}

const post = async (req: NextApiRequest, res: NextApiResponse<CreateEquivalentValueGroup>) => {
  const result = NewPaymentGroupValidationSchema.safeParse(req.body);
  if (!result.success) {
    console.log(result.error.issues);
    return res.status(400).json({
      code: 'invalid-data',
      issues: result.error.issues,
    });
  }
  const paymentGroup: INewPaymentGroup = result.data;
  const newPaymentGroup = await createEquivalentValuePaymentGroup(paymentGroup);
  return res.status(201).json(newPaymentGroup);
}