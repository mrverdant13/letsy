import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Paper, Stack, Typography, TextField, InputAdornment, Divider } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

import { useEquivalentValueContext } from '../../context/equivalent-value/EquivalentValueContext';
import useDebounce from '../../hooks/useDebounce';


export const EquivalenceToolbar = () => {
  const { group: { interest }, setInterest } = useEquivalentValueContext();
  const [dynamicInterest, setDynamicInterest] = useState(interest);
  const [value, setValue] = useState<string>('');
  const [isInvalidInterest, setIsInvalidInterest] = useState<boolean>(false);
  const debouncedInterest = useDebounce(dynamicInterest, 500);
  const isSaved = useMemo(
    () => {
      return debouncedInterest == interest;
    },
    [debouncedInterest, interest],
  );

  useEffect(
    () => {
      if (debouncedInterest == undefined) return;
      setInterest(debouncedInterest);
    },
    [debouncedInterest],
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value.trim();
    setValue(value);
    const interest: number = Number(+value);
    const isInvalidInterest: boolean = isNaN(interest) || value.length === 0;
    setIsInvalidInterest(isInvalidInterest);
    if (isInvalidInterest) return;
    setDynamicInterest(interest);
  };


  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        m: 1,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="body1">
            Interest:
          </Typography>
          <TextField
            value={value}
            onChange={onChange}
            error={isInvalidInterest}
            variant="outlined"
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
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
        >
          {
            value.length > 0 &&
            !isInvalidInterest &&
            (
              isSaved
                ? <>
                  <Typography variant="body2">
                    Saved
                  </Typography>
                  <CheckCircleOutline fontSize="small" />
                </>
                : <>
                  <Typography variant="body2">
                    Saving...
                  </Typography>
                </>
            )
          }
        </Stack>
      </Stack>
    </Paper >
  )
}
