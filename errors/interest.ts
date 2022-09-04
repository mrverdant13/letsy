import { LetsyError } from './_error';

export class MissingInterestError extends LetsyError<void> {
  constructor() {
    super(
      `The interest value is required.`,
      'missing-interest',
    );
    Object.setPrototypeOf(this, MissingInterestError.prototype);
  }
}

export class InvalidInterestError extends LetsyError<void> {
  constructor() {
    super(
      `The interest value is invalid.`,
      'invalid-interest',
    );
    Object.setPrototypeOf(this, InvalidInterestError.prototype);
  }
}
