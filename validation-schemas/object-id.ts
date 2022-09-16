import { z } from 'zod';

const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

export const ObjectIdStringValidationSchema = (name: string = 'ID') => z
  .string({
    required_error: `Required ${name}`,
    invalid_type_error: `Invalid ${name}`,
  })
  .refine(
    (id) => {
      return id.length === 12 || (id.length === 24 && checkForHexRegExp.test(id));
    },
    {
      message: `Invalid ${name}`,
    },
  );