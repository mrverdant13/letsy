import { FC } from 'react';

import { Stack, Box, Chip, Tooltip } from '@mui/material';

import { useEquivalentValueContext } from '../../context/equivalent-value/EquivalentValueContext';

interface Props {
  positionsCount: number;
  blockWidth: number;
}

export const PeriodsBar: FC<Props> = ({
  positionsCount,
  blockWidth,
}) => {
  const { computeEquivalentValue } = useEquivalentValueContext();
  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        display: 'flex',
      }}
    >
      {
        Array.from(
          { length: positionsCount },
          (x, i) => (
            <Box
              key={i}
              sx={{
                width: blockWidth,
                flex: 1,
                display: 'flex',
                my: 1,
              }}
            >
              <Tooltip title="Compute equivalent value for this period">
                <Chip
                  label={i}
                  size="small"
                  sx={{
                    m: 'auto',
                  }}
                  onClick={() => { computeEquivalentValue(i) }}
                />
              </Tooltip>
            </Box>
          ),
        )
      }
    </Stack>

  )
}
