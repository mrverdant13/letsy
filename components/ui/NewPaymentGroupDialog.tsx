import { FC, useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme, Box, Stack } from '@mui/material';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { TextField } from 'formik-mui';

import { PaymentGroupNameValidationSchema } from '../../validation-schemas/payment-group';
import { useEquivalentValueGroupsContext } from '../../context/equivalent-value-groups/context';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const titleId = 'new-payment-group-dialog-title';

export const NewPaymentGroupDialog: FC<Props> = ({
  isOpen,
  close,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { creating, groupId, error, createGroup } = useEquivalentValueGroupsContext();
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      fullScreen={fullScreen}
      aria-labelledby={titleId}
    >
      <Formik
        initialValues={{
          name: '',
        }}
        validate={
          (values) => {
            const errors: { [key: string]: (string | undefined) } = {};
            const result = PaymentGroupNameValidationSchema.safeParse(values.name);
            if (!result.success) {
              errors.name = result.error.issues[0].message;
            }
            return errors;
          }
        }
        onSubmit={
          (values) => {
            const name = PaymentGroupNameValidationSchema.parse(values.name);
            createGroup(name);
          }
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              sx={{
                minWidth: 400,
              }}
            >
              <DialogTitle
                id={titleId}
              >
                Create new payment group
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
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={isSubmitting}
                  onClick={close}
                >
                  Cancel
                </Button>
                <SubmitButton />
              </DialogActions>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

const SubmitButton = () => {
  const { creating, groupId, error, createGroup } = useEquivalentValueGroupsContext();
  const { submitForm, isSubmitting, setSubmitting, resetForm } = useFormikContext();
  useEffect(
    () => {
      setSubmitting(creating);
    },
    [creating],
  );
  useEffect(
    () => {
      if (groupId) {
        resetForm();
      }
    },
    [groupId],
  );
  const submit = () => {
    if (isSubmitting) return;
    submitForm();
  };
  return (
    <Button
      disabled={isSubmitting}
      onClick={submit}>
      Create
    </Button>

  );
}