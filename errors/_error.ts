export class LetsyError<T> extends Error {
  constructor(
    message: string,
    code: string,
    payload?: T,
  ) {
    super(message);
    Object.setPrototypeOf(this, LetsyError.prototype);
    this.code = code;
    this.payload = payload;
  }

  code: string;
  payload?: T;
}