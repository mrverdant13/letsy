import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth';
import { db } from '../../../../database';

import { MethodNotAllowedResponse } from '../../../../interfaces/api/method-not-allowed-response';
import { authOptions } from '../../auth/[...nextauth]';
import { PaymentGroupModel } from '../../../../database/models/payment-group';
import { INewPaymentGroup } from '../../../../interfaces/payment-group';
import { UnauthorizedResponse } from '../../../../interfaces/api/unauthorized-response';

type SeedGroups =
  | UnauthorizedResponse
  | { success: boolean; }
  ;

type Data =
  | MethodNotAllowedResponse
  | SeedGroups
  ;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      if (process.env.NODE_ENV === 'production') {
        return res.status(405).json({ message: 'Method not allowed' });
      }
      return seedGroups(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed' });
}

const seedGroups = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send({ message: 'Unauthorized' });
  await db.connect();
  await PaymentGroupModel.deleteMany();
  const count = req.body.count;
  for (let index = 1; index <= count; index++) {
    const name = `G-${index}`.padStart(3, '0');
    const paymentGroup: (INewPaymentGroup & { owner: string }) = {
      name,
      interest: 5.0,
      payments: [],
      owner: session.userId as string,
    };
    await PaymentGroupModel.create(paymentGroup);
  }
  return res.status(201).json({ message: 'Done' });
}