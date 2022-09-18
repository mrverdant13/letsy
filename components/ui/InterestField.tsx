import { FC, useEffect, ChangeEvent, useState } from 'react';

import { TextField, InputAdornment } from '@mui/material';

import { InterestValidationSchema } from '../../validation-schemas/interests';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import useDebounce from '../../hooks/useDebounce';

export const InterestField: FC = () => {
  const { group: { interest }, updateInterest } = useEquivalenceGroupContext();
  const [inMemoryInterest, setInMemoryInterest] = useState(interest);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const debouncedInterest = useDebounce(inMemoryInterest, 500);

  useEffect(
    () => {
      if (debouncedInterest === interest) return;
      updateInterest(debouncedInterest);
    },
    [interest, debouncedInterest],
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    const result = InterestValidationSchema.safeParse(value);
    setIsInvalid(!result.success);
    setInMemoryInterest(value);
  };

  return (
    <TextField
      required
      id="interest"
      type="number"
      value={inMemoryInterest}
      onChange={onChange}
      label="Interest"
      error={isInvalid}
      size="small"
      sx={{
        width: '15ch',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            %
          </InputAdornment>
        ),
      }}
    />
  );
}
