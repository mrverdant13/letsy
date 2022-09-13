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
        id="periodic-amount"
        name="periodic-amount"
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
      />
    </>
  );
};
