import { NextPage } from 'next';
import { FC, ReactNode, Ref, useEffect, useRef, useState } from 'react';

import { z } from 'zod';
import { Help, Percent } from '@mui/icons-material';
import { Box, Card, CardActionArea, FilledInputProps, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Equation, EquationEvaluate } from "react-equation";
import { Field, FieldProps, Form, Formik, useFormikContext } from 'formik';

import { BasePageLayout } from '../../../components/layouts';
import { InterestValidationSchema } from '../../../validation-schemas/interests';
import { amber, green, grey, indigo } from '@mui/material/colors';

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
const equationTypography = {
  xs: 'h5',
  sm: 'h4',
};

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

const buildCompoundingPeriodsDescription = (name: string): NonNullable<ReactNode> => {
  return (
    <>
      <Typography variant="inherit">
        The quantity of {name} periods within a given time span.
        <br />
        <br />
        <strong>Example:</strong>
        <br />
        From monthly to quarterly
        <br />
        ● Known periods within a year: 12
        <br />
        &nbsp;&nbsp;&nbsp;There are 12 months in a year
        <br />
        ● Desired periods within a year: 4
        <br />
        &nbsp;&nbsp;&nbsp;There are 4 quarters in a year
      </Typography>
      <Stack
        mt={1}
        p={1}
        spacing={1}
        sx={{
          textAlign: 'center',
          border: '1px solid white',
          borderRadius: '5px',
        }}
      >
        <Typography
          variant="inherit"
        >
          Year
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="space-around"
        >
          {
            Array.from(
              { length: 12 },
              (x, i) => (
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: indigo[400],
                  }}
                >
                  M
                </Box>
              )
            )
          }
        </Stack>
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="space-around"
        >
          {
            Array.from(
              { length: 4 },
              (x, i) => (
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: green[700],
                  }}
                >
                  Q
                </Box>
              )
            )
          }
        </Stack>
      </Stack>
    </>
  );
}

const EquivalentInterestRatePageContent = () => {
  const tokenizedEquation = buildEquation(
    knownInterestToken,
    knownCompoundingPeriodsToken,
    desiredCompoundingPeriodsToken,

  );
  const tokenizedComparison = `${desiredInterestToken} = ${tokenizedEquation}`

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
                name="Known Interest Rate"
                description="The interest rate that you want to convert."
              />
              <ValueField
                token={knownCompoundingPeriodsToken}
                name="Known Periods In Time Window"
                description={buildCompoundingPeriodsDescription('known')}
              />
              <ValueField
                token={desiredCompoundingPeriodsToken}
                name="Desired Periods In Time Window"
                description={buildCompoundingPeriodsDescription('desired')}
              />
              <Box
                sx={{
                  pt: 5,
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
  name: string;
  description: NonNullable<ReactNode> | string;
  InputProps?: Partial<FilledInputProps>;
}

const ValueField: FC<ValueFieldProps> = ({ token, name, description, InputProps }) => {
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
      <Tooltip
        title={(
          <>
            <Typography variant="body1">
              {name} ( {<Equation value={knownInterestToken} />} )
            </Typography>
            <Typography variant="caption">
              {description}
            </Typography>
          </>
        )}
        componentsProps={{
          tooltip: {
            sx: {
              maxWidth: 600,
              py: 1,
              px: 2,
              backgroundColor: grey[800],
            },
          },
        }}
      >
        <Help
          sx={{
            mx: 1,
          }}
        />
      </Tooltip>
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
        <Typography
          sx={{
            typography: equationTypography,
          }}
        >
          <EquationEvaluate
            ref={equationRef}
            value={evaluatedEquation}
            decimals={{
              type: 'fixed',
              digits,
            }}
          />
        </Typography>
        <Tooltip
          title="Copy to clipboard"
        >
          <Card variant="outlined">
            <CardActionArea
              sx={{
                px: 3,
                py: 1,
                pointer: 'cursor',
                typography: 'inherit',
              }}
              onClick={() => navigator.clipboard.writeText(`${desiredInterest}`)}
            >
              <Typography
                sx={{
                  typography: equationTypography,
                }}
              >
                <Equation
                  value={`${desiredInterestToken}=${Number((desiredInterest * 100).toFixed(digits - 2))}%`}
                />
              </Typography>
            </CardActionArea>
          </Card>
        </Tooltip>
      </Stack>
    );
  }
  return (
    <Typography
      sx={{
        typography: equationTypography,
      }}
    >
      <Equation
        value={evaluatedComparison}
      />
    </Typography>
  );
}