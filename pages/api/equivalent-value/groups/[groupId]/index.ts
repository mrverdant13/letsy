import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { UnauthorizedResponse } from '../../../../../interfaces/api/unauthorized-response';
import { BadRequestWithInvalidDataResponse } from '../../../../../interfaces/api/bad-request-response';
import { IPaymentGroup } from '../../../../../interfaces/payment-group';
import { MethodNotAllowedResponse } from '../../../../../interfaces/api/method-not-allowed-response';
import { db } from '../../../../../database';
import { authOptions } from '../../../auth/[...nextauth]';
import { UpdatedPaymentGroupValidationSchema } from '../../../../../validation-schemas/payment-group';
import { PaymentGroupModel } from '../../../../../database/models/payment-group';
import { NotFoundResponse } from '../../../../../interfaces/api/not-found-request';
import { ForbiddenResponse } from '../../../../../interfaces/api/forbidden-request';

type UpdateEquivalenceGroup =
  | UnauthorizedResponse
  | BadRequestWithInvalidDataResponse
  | ForbiddenResponse
  | NotFoundResponse
  | IPaymentGroup
  ;

type DeleteEquivalenceGroup =
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse
  ;

type Data =
  | MethodNotAllowedResponse
  | UpdateEquivalenceGroup
  ;

export default function endpoint(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'PATCH': {
      return updateGroup(req, res);
    }
    case 'DELETE': {
      return deleteGroup(req, res);
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}

const updateGroup = async (req: NextApiRequest, res: NextApiResponse<UpdateEquivalenceGroup>) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send({ message: 'Unauthorized' });
  const result = UpdatedPaymentGroupValidationSchema.safeParse({ ...req.body, owner: session.userId });
  if (!result.success) {
    console.log(result.error.issues);
    return res.status(400).json({
      code: 'invalid-data',
      issues: result.error.issues,
    });
  }
  const { groupId } = req.query as { groupId: string };
  await db.connect();
  const group = await PaymentGroupModel.findById(groupId);
  if (group == null) return res.status(404).json({ code: 404, message: 'Not Found' });
  if (group.owner?.toString() !== session.userId) return res.status(403).json({ code: 403, message: 'Forbidden' });
  const resultingGroup = await group.set(result.data).save();
  return res.status(200).json(resultingGroup.toJSON());
}

const deleteGroup = async (req: NextApiRequest, res: NextApiResponse<DeleteEquivalenceGroup>) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send({ message: 'Unauthorized' });
  const { groupId } = req.query as { groupId: string };
  await db.connect();
  const group = await PaymentGroupModel.findById(groupId);
  if (group == null) return res.status(404).json({ code: 404, message: 'Not Found' });
  if (group.owner?.toString() !== session.userId) return res.status(403).json({ code: 403, message: 'Forbidden' });
  await group.delete();
  return res.status(200).json({});
}
