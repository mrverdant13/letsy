import { FC, useEffect, ChangeEvent, useState, useMemo } from 'react';

import { TextField, InputAdornment } from '@mui/material';
import { Percent } from '@mui/icons-material';
import { Field, Form, Formik, useField, FieldProps } from 'formik';

import { InterestValidationSchema } from '../../validation-schemas/interests';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import useDebounce from '../../hooks/useDebounce';

const sanitize = (value: number, decimals: number): number => {
  const power = Math.pow(10, decimals);
  const powered = value * power;
  const roundedPowered = Math.floor(powered);
  const sanitized = roundedPowered / power;
  return sanitized;
}
const sanitizeRelativeInterest = (value: number) => sanitize(value, 6);
const sanitizePorcentualInterest = (value: number) => sanitize(value, 4);

export const InterestField: FC = () => {
  const { group: { interest: initialInterest } } = useEquivalenceGroupContext();
  return (
    <Formik
      initialValues={{ interest: sanitizePorcentualInterest(initialInterest * 100) }}
      validateOnMount
      validate={
        (values) => {
          const errors: { [key: string]: (string | undefined) } = {};
          const result = InterestValidationSchema.safeParse(values.interest);
          if (!result.success) {
            errors.interest = result.error.issues[0].message
          }
          return errors;
        }
      }
      onSubmit={() => { }}
    >
      <Form>
        <InterestFieldContent />
      </Form>
    </Formik >
  );
}

const InterestFieldContent: FC = () => {
  const { loading, group: { interest: rawInterest }, updateInterest } = useEquivalenceGroupContext();
  const interest = sanitizePorcentualInterest(rawInterest * 100);
  const [field, meta, helpers] = useField<number>('interest');
  const inMemoryInterest = field.value;
  const isValid = meta.error == undefined;
  const debouncedInterest = useDebounce(isValid ? inMemoryInterest : NaN, 500);

  const hasBeenChanged = interest !== inMemoryInterest;
  const hasBeenApplied = interest === debouncedInterest;
  const canApplyChange = isValid && inMemoryInterest === debouncedInterest;

  const color = useMemo(
    () => {
      if (!isValid) return 'error';
      if (hasBeenChanged) return 'warning';
    },
    [isValid, hasBeenChanged],
  );

  useEffect(
    () => {
      if (loading) return;
      if (hasBeenApplied) return;
      if (!canApplyChange) return;
      const actualInterest = sanitizeRelativeInterest(debouncedInterest / 100);
      updateInterest(actualInterest);
    },
    [loading, debouncedInterest, hasBeenApplied, canApplyChange],
  );

  return (
    <TextField
      {...field}
      required
      id="interest"
      type="number"
      onBlur={() => {
        if (loading) return;
        return helpers.setValue(sanitizePorcentualInterest(interest));
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.valueAsNumber;
        if (isNaN(raw)) {
          field.onChange(e);
          return;
        }
        const sanitized = sanitizePorcentualInterest(raw);
        helpers.setValue(sanitized);
      }}
      label="Interest"
      size="small"
      color={color}
      sx={{
        width: '15ch',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Percent fontSize="small" />
          </InputAdornment>
        ),
      }}
      inputProps={{ min: 0 }}
    />
  );
}
