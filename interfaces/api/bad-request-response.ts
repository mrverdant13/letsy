import { z } from 'zod';

export type BadRequestResponse = {
  message?: string;
};

export type BadRequestWithInvalidDataResponse = {
  code: 'invalid-data',
  issues: z.ZodIssue[];
};
