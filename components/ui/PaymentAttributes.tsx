import { FC } from 'react';

import { Field } from 'formik';
import { TextField } from 'formik-mui';

import { IPaymentType } from '../../interfaces/payment-type';

interface PaymentAttributesProps {
  type: IPaymentType;
}

export const PaymentAttributes: FC<PaymentAttributesProps> = ({
  type,
}) => {
  return (
    <>
      <Field
        required
        component={TextField}
        id="position"
        name="position"
        type="number"
        label="Position"
        inputProps={{
          min: 0,
        }}
      />
      {
        (() => {
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
          };
        })()
      }

    </>
  );
}

const SimplePaymentAttributes: FC = () => {
  return (
    <>
      <Field
        required
        component={TextField}
        id="amount"
        name="amount"
        type="number"
        label="Amount"
      />
    </>
  );
};

const UniformSeriesPaymentAttributes: FC = () => {
  return (
    <>
      <Field
        required
        component={TextField}
        id="periodicAmount"
        name="periodicAmount"
        type="number"
        label="Periodic amount"
      />
      <Field
        required
        component={TextField}
        id="periods"
        name="periods"
        type="number"
        label="Periods"
        inputProps={{
          min: 0,
        }}
      />
    </>
  );
};
