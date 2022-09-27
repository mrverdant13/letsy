import { IPaymentGroup } from '../interfaces/payment-group';
import { IPaymentType } from '../interfaces/payment-type';
import { ISinglePayment, IUniformSeriesPayment } from '../interfaces/payment';
import { MissingInterestError, InvalidInterestError } from '../errors/interest';

export const calculateEquivalentValue = (
  group: IPaymentGroup,
  targetPosition: number,
): ISinglePayment => {
  const interest = group.interest;
  if (interest == undefined) throw new MissingInterestError();
  if (interest < 0) throw new InvalidInterestError();
  const amount: number = group.payments.reduce<number>((sum, payment) => {
    const amount: number =
      ((): number => {
        switch (payment.type) {
          case IPaymentType.single: {
            return calculateEquivalentValueForSinglePayment(
              payment,
              interest,
              targetPosition,
            ).amount;
          }
          case IPaymentType.uniformSeries: {
            return calculateEquivalentValueForUniformSeriesPayment(
              payment,
              interest,
              targetPosition,
            ).amount;
          }
        }
      })();
    return sum + amount;
  },
    0,
  );
  return {
    name: 'Equivalent Value',
    position: targetPosition,
    type: IPaymentType.single,
    amount,
    images: [],
  };
}

// ? Single Payment

const calculateEquivalentValueForSinglePayment = (
  payment: ISinglePayment,
  interest: number,
  targetPosition: number,
): ISinglePayment => {
  if (targetPosition === payment.position) return payment;
  const relativePosition: number = targetPosition - payment.position;
  const amountFactor: number = Math.pow(
    1 + interest,
    relativePosition,
  );
  const amount: number = payment.amount * amountFactor;
  return {
    name: 'Equivalent Value',
    position: targetPosition,
    type: IPaymentType.single,
    amount,
    images: [],
  };
};

// ? Uniform Series Payment

const getExponentialFactor = (
  payment: IUniformSeriesPayment,
  interest: number,
): number => {
  return Math.pow(
    1 + interest,
    payment.periods,
  );
};


const calculateEquivalentValueAtBeginningForUniformSeriesPayment = (
  payment: IUniformSeriesPayment,
  interest: number,
): ISinglePayment => {
  const exponentialFactor: number = getExponentialFactor(
    payment,
    interest,
  );
  const amountFactor: number = (exponentialFactor - 1) / (exponentialFactor * interest);
  const amount: number = payment.periodicAmount * amountFactor;
  return {
    name: 'Equivalent Value',
    position: payment.position,
    type: IPaymentType.single,
    amount,
    images: [],
  };
};

const calculateEquivalentValueForUniformSeriesPayment = (
  payment: IUniformSeriesPayment,
  interest: number,
  targetPosition: number,
): ISinglePayment => {
  const equivalentPaymentAtTheBeginning: ISinglePayment = calculateEquivalentValueAtBeginningForUniformSeriesPayment(
    payment,
    interest,
  );
  return calculateEquivalentValueForSinglePayment(
    equivalentPaymentAtTheBeginning,
    interest,
    targetPosition,
  );
};