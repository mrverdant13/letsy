import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { v2 as cloudinary } from 'cloudinary'

import { UnauthorizedResponse } from '../../../../../interfaces/api/unauthorized-response';
import { authOptions } from '../../../auth/[...nextauth]';
import { db } from '../../../../../database';
import { PaymentGroupModel } from '../../../../../database/models/payment-group';
import { MethodNotAllowedResponse } from '../../../../../interfaces/api/method-not-allowed-response';
import { NotFoundResponse } from '../../../../../interfaces/api/not-found-request';
import { ForbiddenResponse } from '../../../../../interfaces/api/forbidden-request';
import { IPaymentImageSignatureData } from '../../../../../interfaces/payment-image-signature-data';
import config from '../../../../../config';

const cloudinaryConf = config.cloudinary;

type SignPaymentImageUploadData =
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse
  | IPaymentImageSignatureData
  ;

type Data =
  | MethodNotAllowedResponse
  | SignPaymentImageUploadData
  ;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST': {
      return signPaymentImageUpload(req, res);
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}

const signPaymentImageUpload = async (req: NextApiRequest, res: NextApiResponse<SignPaymentImageUploadData>) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send({ message: 'Unauthorized' });
  const userId = session.userId as string;
  const { groupId } = req.query as { groupId: string };
  await db.connect();
  const group = await PaymentGroupModel.findById(groupId);
  if (group == null) return res.status(404).json({ code: 404, message: 'Not Found' });
  if (group.owner?.toString() !== session.userId) return res.status(403).json({ code: 403, message: 'Forbidden' });
  const folder = `letsy/${userId}/${groupId}`;
  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      source: 'uw',
      folder,
    },
    cloudinaryConf.apiSecret,
  );
  res.status(201).json({
    signature,
    timestamp,
    cloudName: cloudinaryConf.cloudName,
    apiKey: cloudinaryConf.cloudName,
    folder,
  })
}

