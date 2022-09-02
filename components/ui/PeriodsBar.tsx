import { FC } from 'react';

import { Stack, Box, Chip } from '@mui/material';

interface Props {
  positionsCount: number;
  blockWidth: number;
}

export const PeriodsBar: FC<Props> = ({
  positionsCount,
  blockWidth,
}) => {
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
              <Chip
                label={i}
                size="small"
                sx={{
                  m: 'auto',
                }}
              />
            </Box>
          ),
        )
      }
    </Stack>

  )
}
