import { Paper, Stack, Typography, Divider } from '@mui/material';

import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import { InterestField } from './InterestField';
import { useEquivalenceContext } from '../../context/equivalence/context';

export const EquivalenceToolbar = () => {
  const { loading } = useEquivalenceGroupContext();
  const { error, equivalentPayment } = useEquivalenceContext();

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
        {
          loading &&
          <Typography>
            Loading...
          </Typography>
        }
        {
          error &&
          <Typography>
            {error.code}
          </Typography>
        }
        {
          !loading &&
          !error &&
          equivalentPayment &&
          <Typography>
            Amount: {equivalentPayment.amount} - Period: {equivalentPayment.position}
          </Typography>
        }
      </Stack>
    </Paper >
  )
}
