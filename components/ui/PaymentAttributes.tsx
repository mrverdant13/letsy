import { FC } from 'react';

import { TextField } from '@mui/material';

import { IPaymentType } from '../../interfaces/payment-type';

interface PaymentAttributesProps {
  type: IPaymentType;
}

export const PaymentAttributes: FC<PaymentAttributesProps> = ({
  type,
}) => {
  switch (type) {
    case IPaymentType.single: {
      return (
        <SimplePaymentAttributes />
      );
    }
    case IPaymentType.uniformSeries: {
      return (
        <UniformSeriesPaymentAttributes />
      );
    }
  }
}

const SimplePaymentAttributes = () => {
  return (
    <>
      <TextField
        required
        id="position"
        label="Position"
      />
      <TextField
        required
        id="amount"
        label="Amount"
      />
    </>
  );
};

const UniformSeriesPaymentAttributes = () => {
  return (
    <>
      <TextField
        required
        id="position"
        label="Position"
      />
      <TextField
        required
        id="periodic-amount"
        label="Periodic amount"
      />
      <TextField
        required
        id="periods"
        label="Periods"
      />
    </>
  );
};
