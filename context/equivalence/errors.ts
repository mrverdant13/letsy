type InvalidDataError = {
  code: 'invalid-data';
};

type UnexpectedError = {
  code: 'unexpected';
};

export type EquivalenceError =
  | InvalidDataError
  | UnexpectedError
  ;
