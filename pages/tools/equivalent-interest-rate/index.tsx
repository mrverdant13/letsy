import { NextPage } from 'next';
import { FC, Ref, useEffect, useRef, useState } from 'react';

import { z } from 'zod';
import { Percent } from '@mui/icons-material';
import { Box, Card, FilledInputProps, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Equation, EquationEvaluate } from "react-equation";
import { Field, FieldProps, Form, Formik, useFormikContext } from 'formik';

import { BasePageLayout } from '../../../components/layouts';
import { InterestValidationSchema } from '../../../validation-schemas/interests';

const EquivalentInterestRatePage: NextPage = () => {
  return (
    <BasePageLayout
      tabTitle="Equivalent Interest Rate Calculator"
      appBarTitle={
        <Typography
          variant="h6"
          sx={{
            mx: 1,
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          Equivalent Interest Rate Calculator
        </Typography>
      }
      description="Calculate the interest rate for a new compounding frequency"
      sx={{
        display: undefined,
      }}
    >
      <EquivalentInterestRatePageContent />
    </BasePageLayout>
  );
}
export default EquivalentInterestRatePage;

const digits: number = 4;
const desiredInterestToken = 'i_d';
const knownInterestToken = 'i_k';
const desiredCompoundingPeriodsToken = 'p_d';
const knownCompoundingPeriodsToken = 'p_k';

const buildEquation = (
  knownInterest: string | number,
  knownCompoundingPeriods: string | number,
  desiredCompoundingPeriods: string | number,
) => {
  return `(1 + ${knownInterest}) ^ (${knownCompoundingPeriods} / ${desiredCompoundingPeriods}) - 1`;
}

const CompoundingPeriodsValidationSchema = (name: string) => z
  .number({
    required_error: `${name} is required`,
    invalid_type_error: `${name} must be a number`,
  })
  .int(
    `${name} should be a positive integer`,
  )
  .positive(
    `${name} should be a positive integer`,
  );

const EquivalentInterestRateDataValidationSchema = z.object({
  [knownInterestToken]: InterestValidationSchema,
  [knownCompoundingPeriodsToken]: CompoundingPeriodsValidationSchema('The known compounding periods value'),
  [desiredCompoundingPeriodsToken]: CompoundingPeriodsValidationSchema('The desired compounding periods value'),
});

type EquivalentInterestRateData = z.infer<typeof EquivalentInterestRateDataValidationSchema>;

const EquivalentInterestRatePageContent = () => {
  const tokenizedEquation = buildEquation(
    knownInterestToken,
    knownCompoundingPeriodsToken,
    desiredCompoundingPeriodsToken,

  );
  const tokenizedComparison = `${desiredInterestToken} = ${tokenizedEquation}`

  const equationTypography = {
    xs: 'h5',
    sm: 'h4',
  };

  const percentAdornment = (
    <InputAdornment
      position="end"
    >
      <Percent fontSize="small" />
    </InputAdornment>
  );

  const initialValues: EquivalentInterestRateData = {
    [knownInterestToken]: 0,
    [knownCompoundingPeriodsToken]: 0,
    [desiredCompoundingPeriodsToken]: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={
        (values) => {
          const errors: { [key: string]: (string | undefined) } = {};
          const result = EquivalentInterestRateDataValidationSchema.safeParse(values);
          if (!result.success) {
            const issues = result.error.issues;
            issues.forEach(issue => {
              const field = issue.path.length > 0 ? issue.path[0] : undefined;
              if (field) errors[field] = issue.message;
            });
          }
          return errors;
        }
      }
      onSubmit={() => { }}
    >
      {() => {
        return (
          <Form>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{
                my: {
                  xs: 2,
                  sm: 5,
                },
                textAlign: 'center',
                color: 'textPrimary',
                '* svg': {
                  color: 'textPrimary',
                  fill: 'currentColor',
                },
              }}
            >
              <Typography
                sx={{
                  typography: equationTypography,
                }}
              >
                <Equation
                  value={tokenizedComparison}
                />
              </Typography>
              <ValueField
                token={knownInterestToken}
                InputProps={{
                  endAdornment: percentAdornment,
                }}
              />
              <ValueField
                token={desiredCompoundingPeriodsToken}
              />
              <ValueField
                token={knownCompoundingPeriodsToken}
              />
              <Box
                sx={{
                  pt: 5,
                  typography: equationTypography,
                  width: "100%",
                }}
              >
                <Result />
              </Box>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}

interface ValueFieldProps {
  token: string;
  InputProps?: Partial<FilledInputProps>;
}

const ValueField: FC<ValueFieldProps> = ({ token, InputProps }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
    >
      <Typography
        sx={{
          width: '3ch',
        }}
      >
        <Equation value={token} />
      </Typography>
      {' = '}
      <Field
        id={token}
        name={token}
      >
        {
          ({ field, meta }: FieldProps) => (
            <TextField
              {...field}
              error={Boolean(meta.touched && meta.error)}
              type="number"
              size="small"
              InputProps={InputProps}
              inputProps={{ min: 0 }}
              sx={{
                ml: 1,
                width: '15ch',
              }}
            />
          )
        }
      </Field>
    </Stack>

  );
}

const Result: FC = () => {
  const { isValid, values, dirty, errors } = useFormikContext<EquivalentInterestRateData>();
  const equationRef = useRef<any>();
  const [desiredInterest, setDesiredInterest] = useState<number>(0);
  const evaluatedEquation = buildEquation(
    (!dirty || errors[knownInterestToken]) ? knownInterestToken : (values[knownInterestToken] / 100),
    (!dirty || errors[knownCompoundingPeriodsToken]) ? knownCompoundingPeriodsToken : values[knownCompoundingPeriodsToken],
    (!dirty || errors[desiredCompoundingPeriodsToken]) ? desiredCompoundingPeriodsToken : values[desiredCompoundingPeriodsToken],
  );
  const evaluatedComparison = `${evaluatedEquation} = ${desiredInterestToken}`
  useEffect(
    () => {
      setDesiredInterest(
        equationRef.current == null
          ? 0
          : equationRef.current.result.value,
      );
    },
  );
  if (dirty && isValid) {
    return (
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <EquationEvaluate
          ref={equationRef}
          value={evaluatedEquation}
          decimals={{
            type: 'fixed',
            digits,
          }}
        />
        <Card
          variant="outlined"
          sx={{
            px: 3,
            py: 1,
          }}
        >
          <Equation
            value={`${desiredInterestToken}=${Number((desiredInterest * 100).toFixed(digits - 2))}%`}
          />
        </Card>
      </Stack>
    );
  }
  return (
    <Equation
      value={evaluatedComparison}
    />
  );
}