import { FC } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme, Box, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

import { PaymentTypeDropdown } from './PaymentTypeDropdown';
import { IPaymentType } from '../../interfaces/payment-type';
import { PaymentAttributes } from './PaymentAttributes';
import { PaymentValidationSchema } from '../../validation-schemas/payment';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const titleId = 'new-payment-dialog-title';

export const NewPaymentDialog: FC<Props> = ({
  isOpen,
  close,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Formik
      initialValues={{
        name: '',
        type: undefined,
        position: 0,

        // Simple payment
        amount: 0,

        // Uniform series payment
        periodicAmount: 0,
        periods: 0,

      }}
      validate={
        (values) => {
          const errors: { [key: string]: (string | undefined) } = {};
          const result = PaymentValidationSchema.safeParse(values);
          if (result.success) return errors;
          const issues = result.error.issues;
          issues.forEach((issue) => {
            const field = issue.path.length > 0 ? issue.path[0] : undefined;
            if (field) {
              errors[field] = field === 'type' ? 'Invalid value' : issue.message;
            }
          });
          return errors;
        }
      }
      onSubmit={
        (values, { setSubmitting }) => {
          console.log(values);
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
                    />
                    {
                      type &&
                      <PaymentAttributes type={type} />
                    }
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={close}>
                    Cancel
                  </Button>
                  <Button onClick={() => submitForm()}>
                    Add
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  )
}

