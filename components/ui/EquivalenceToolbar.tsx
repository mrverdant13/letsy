import { Paper, Stack, Typography, Divider, CircularProgress, Box, Skeleton } from '@mui/material';

import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import { InterestField } from './InterestField';
import { useEquivalenceContext } from '../../context/equivalence/context';

export const EquivalenceToolbar = () => {
  const { loading: loadingGroup } = useEquivalenceGroupContext();
  const { loading: loadingEquivalence, equivalentPayment } = useEquivalenceContext();

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
        <InterestField />
        <Divider orientation="vertical" flexItem />
        <Stack
          direction="row"
          sx={{
            flex: 1,
          }}
        >
          {
            loadingGroup &&
            <CircularProgress color="inherit" />
          }
        </Stack>
        {
          loadingEquivalence &&
          <Skeleton
            animation="wave"
            sx={{
              width: 250,
            }}
          />
        }
        {
          !loadingEquivalence &&
          equivalentPayment &&
          <Typography>
            Amount: {(Math.floor(equivalentPayment.amount * 100) / 100).toFixed(2)} - Period: {equivalentPayment.position}
          </Typography>
        }
      </Stack>
    </Paper >
  )
}
