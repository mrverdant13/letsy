import { NextPage } from 'next';
import { ChangeEvent, FC, Ref, useEffect, useRef, useState } from 'react';

import { z } from 'zod';
import { Percent } from '@mui/icons-material';
import { Box, Card, Divider, FilledInputProps, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from "react-equation";
import { defaultVariables, defaultFunctions } from "equation-resolver";

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

const CompoundingPeriodsValidationSchema = z
  .number()
  .int()
  .positive();

const EquivalentInterestRatePageContent = () => {
  const equationRef = useRef<any>();

  const [knownInterest, setKnownInterest] = useState<number>(0);
  const [knownCompoundingPeriods, setKnownCompoundingPeriods] = useState<number>(0);
  const [desiredCompoundingPeriods, setDesiredCompoundingPeriods] = useState<number>(0);
  const [desiredInterest, setDesiredInterest] = useState<number>(0);

  useEffect(
    () => {
      setDesiredInterest(
        equationRef.current == null
          ? 0
          : equationRef.current.result.value,
      );
    },
  );

  const knownInterestIsValid = InterestValidationSchema.safeParse(knownInterest).success;
  const knownCompoundingPeriodsValueIsValid = CompoundingPeriodsValidationSchema.safeParse(knownCompoundingPeriods).success;
  const desiredCompoundingPeriodsValueIsValid = CompoundingPeriodsValidationSchema.safeParse(desiredCompoundingPeriods).success;
  const allValid = knownInterestIsValid && knownCompoundingPeriodsValueIsValid && desiredCompoundingPeriodsValueIsValid;

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

  const tokenizedEquation = buildEquation(
    knownInterestToken,
    knownCompoundingPeriodsToken,
    desiredCompoundingPeriodsToken,

  );
  const evaluatedEquation = buildEquation(
    knownInterest,
    knownCompoundingPeriods,
    desiredCompoundingPeriods,

  );
  const tokenizedComparison = `${desiredInterestToken} = ${tokenizedEquation}`
  const evaluatedComparison = `${evaluatedEquation} = ${desiredInterestToken}`

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

  return (
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
      <Divider flexItem />
      <ValueField
        token={knownInterestToken}
        value={knownInterest * 100}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setKnownInterest(Math.max(0, e.target.valueAsNumber) / 100)}
        InputProps={{
          endAdornment: percentAdornment,
        }}
      />
      <ValueField
        token={desiredCompoundingPeriodsToken}
        value={desiredCompoundingPeriods}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDesiredCompoundingPeriods(Math.max(0, e.target.valueAsNumber))}
      />
      <ValueField
        token={knownCompoundingPeriodsToken}
        value={knownCompoundingPeriods}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setKnownCompoundingPeriods(Math.max(0, e.target.valueAsNumber))}
      />
      <Typography
        sx={{
          typography: equationTypography,
          width: "100%",
        }}
      >
        {
          allValid
            ?
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
              <Divider flexItem />
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
            :
            <Equation
              value={evaluatedComparison}
            />
        }
      </Typography>
    </Stack>
  );
}

interface ValueFieldProps {
  token: string;
  value: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  InputProps?: Partial<FilledInputProps>;
}

const ValueField: FC<ValueFieldProps> = ({ token, value, onChange, InputProps }) => {
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
      <TextField
        disabled={!Boolean(onChange)}
        value={value}
        type="number"
        onChange={onChange}
        sx={{
          ml: 1,
          width: '15ch',
        }}
        size="small"
        InputProps={InputProps}
      />
    </Stack>

  );
}