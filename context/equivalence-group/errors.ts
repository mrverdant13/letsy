import { z } from 'zod';

type InvalidDataError = {
  code: 'invalid-data',
  issues: z.ZodIssue;
}

export type Error =
  | InvalidDataError
  ;