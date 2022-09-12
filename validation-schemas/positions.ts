import { z } from 'zod';

export const PositionValidationSchema = (
  name: string = 'Position',
) => z
  .number({
    required_error: `${name} is required`,
    invalid_type_error: `${name} must be a number`
  })
  .int(
    `${name} must be a non-negative integer`,
  )
  .nonnegative(
    `${name} must be a non-negative integer`,
  );
