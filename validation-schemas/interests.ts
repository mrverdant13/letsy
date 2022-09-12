import { z } from 'zod';

export const InterestValidationSchema = z
  .number({
    required_error: 'Interest is required',
    invalid_type_error: 'Interest must be a number',
  })
  .positive(
    'Interest must be a positive number',
  );