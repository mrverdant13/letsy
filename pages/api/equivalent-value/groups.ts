import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth';

import { MethodNotAllowedResponse } from '../../../interfaces/api/method-not-allowed-response';
import { NewPaymentGroupValidationSchema } from '../../../validation-schemas/payment-group';
import { INewPaymentGroup, IPaymentGroup } from '../../../interfaces/payment-group';
import { BadRequestWithInvalidDataResponse } from '../../../interfaces/api/bad-request-response';
import { authOptions } from '../auth/[...nextauth]';
import { UnauthorizedResponse } from '../../../interfaces/api/unauthorized-response';
import { db } from '../../../database';
import { PaymentGroupModel } from '../../../database/models/payment-group';

type CreateEquivalentValueGroup =
  | UnauthorizedResponse
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
      return createGroup(req, res);
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}

const createGroup = async (req: NextApiRequest, res: NextApiResponse<CreateEquivalentValueGroup>) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send({ message: 'Unauthorized' });
  const result = NewPaymentGroupValidationSchema.safeParse({ ...req.body, owner: session.userId });
  if (!result.success) {
    console.log(result.error.issues);
    return res.status(400).json({
      code: 'invalid-data',
      issues: result.error.issues,
    });
  }
  const paymentGroup = {
    ...result.data,
    owner: session.userId as string,
  };
  await db.connect();
  const newPaymentGroup = await PaymentGroupModel.create(paymentGroup);
  return res.status(201).json(newPaymentGroup.toJSON());
}