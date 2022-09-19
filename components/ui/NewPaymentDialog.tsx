import { FC, useEffect, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme, Box, Stack } from '@mui/material';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { TextField } from 'formik-mui';

import { PaymentTypeDropdown } from './PaymentTypeDropdown';
import { IPaymentType } from '../../interfaces/payment-type';
import { PaymentAttributes } from './PaymentAttributes';
import { PaymentValidationSchema } from '../../validation-schemas/payment';
import { SpecificPaymentGroupPaymentsValidationSchema } from '../../validation-schemas/payment-group';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import usePrevious from '../../hooks/usePrevious';
import { IPayment } from '../../interfaces/payment';

interface Props {
  isOpen: boolean;
  close: () => void;
  payment?: IPayment;
}

const titleId = 'new-payment-dialog-title';

export const NewPaymentDialog: FC<Props> = (props) => {
  const { isOpen, close, payment } = props;
  const isEditing = Boolean(payment);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { group, addPayment, updatePayment } = useEquivalenceGroupContext();
  return (
    <Formik
      initialValues={{
        // Base
        name: payment?.name ?? '',
        type: payment?.type ?? '',
        position: payment?.position ?? 0,

        // Simple payment
        amount: (payment?.type === IPaymentType.single) ? payment?.amount : 0,

        // Uniform series payment
        periodicAmount: (payment?.type === IPaymentType.uniformSeries) ? payment?.periodicAmount : 0,
        periods: (payment?.type === IPaymentType.uniformSeries) ? payment?.periods : 0,
      }}
      validate={
        (values) => {
          const errors: { [key: string]: (string | undefined) } = {};
          const paymentValidationResult = PaymentValidationSchema.safeParse(values);
          if (!paymentValidationResult.success) {
            const issues = paymentValidationResult.error.issues;
            issues.forEach((issue) => {
              const field = issue.path.length > 0 ? issue.path[0] : undefined;
              if (field) {
                errors[field] = field === 'type' ? 'Invalid value' : issue.message;
              }
            });
          } else {
            const payments = [...group.payments, values];
            const paymentsValidationResult = SpecificPaymentGroupPaymentsValidationSchema.safeParse(payments);
            if (!paymentsValidationResult.success) {
              errors.name = paymentsValidationResult.error.issues[0].message;
            }
          }
          return errors;
        }
      }
      onSubmit={
        (values) => {
          const resultingPayment = PaymentValidationSchema.parse(values);
          if (isEditing) {
            updatePayment(payment!.name, resultingPayment);
          } else {
            addPayment(resultingPayment);
          }
        }
      }
    >
      {({ values: { type: typeString }, submitForm, isSubmitting }) => {
        const type = IPaymentType.parse(typeString ?? '');
        return (
          <Form>
            <Dialog
              open={isOpen}
              onClose={close}
              fullScreen={fullScreen}
              aria-labelledby={titleId}
            >
              <Box
                sx={{
                  minWidth: 400,
                }}
              >
                <DialogTitle
                  id={titleId}
                >
                  Add new payment
                </DialogTitle>
                <DialogContent>
                  <Stack
                    spacing={3}
                    padding={1}
                  >
                    <Field
                      required
                      component={TextField}
                      id="name"
                      name="name"
                      type="text"
                      label="Name"
                    />
                    <PaymentTypeDropdown
                      id="type"
                      name="type"
                      label="Payment type"
                      isEditing={isEditing}
                    />
                    {
                      type &&
                      <PaymentAttributes type={type} />
                    }
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={isSubmitting}
                    onClick={close}
                  >
                    Cancel
                  </Button>
                  <SubmitButton {...props} />
                </DialogActions>
              </Box>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  )
}

const SubmitButton: FC<Props> = ({ close, payment }) => {
  const isEditing = Boolean(payment);
  const { loading: isLoading, group, errors } = useEquivalenceGroupContext();
  const { submitForm, isSubmitting, setSubmitting, resetForm } = useFormikContext();
  const wasLoading = usePrevious(isLoading);
  const hasErrors = errors.length > 0;
  useEffect(
    () => {
      setSubmitting(isLoading);
    },
    [isLoading],
  );
  useEffect(
    () => {
      if (isLoading) return;
      if (!wasLoading) return;
      if (hasErrors) return;
      resetForm();
      close();
    },
    [wasLoading, isLoading, hasErrors],
  );
  const submit = () => {
    if (isSubmitting) return;
    submitForm();
  };
  return (
    <Button
      disabled={isSubmitting}
      onClick={submit}
    >
      {isEditing ? 'Save' : 'Create'}
    </Button>

  );

}
