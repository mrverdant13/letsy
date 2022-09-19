import { FC, useEffect, ChangeEvent, useState, useMemo } from 'react';

import { TextField, InputAdornment } from '@mui/material';
import { Percent } from '@mui/icons-material';

import { InterestValidationSchema } from '../../validation-schemas/interests';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import useDebounce from '../../hooks/useDebounce';

export const InterestField: FC = () => {
  const { loading, group: { interest: rawInterest }, updateInterest } = useEquivalenceGroupContext();
  const interest = rawInterest * 100;
  const [inMemoryInterest, setInMemoryInterest] = useState(interest);
  const isValid = useMemo(
    () =>
      InterestValidationSchema.safeParse(inMemoryInterest).success,
    [inMemoryInterest],
  );
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
      updateInterest(debouncedInterest / 100);
    },
    [loading, debouncedInterest, hasBeenApplied, canApplyChange],
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    setInMemoryInterest(value);
  };

  return (
    <TextField
      required
      id="interest"
      type="number"
      value={inMemoryInterest}
      onChange={onChange}
      onBlur={() => setInMemoryInterest(interest)}
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
    />
  );
}
