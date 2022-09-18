import { Paper, Stack, Typography, Divider } from '@mui/material';

import { useEquivalentValueContext } from '../../context/equivalent-value/EquivalentValueContext';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import { InterestField } from './InterestField';

export const EquivalenceToolbar = () => {
  const { loading } = useEquivalenceGroupContext();
  const { computeEquivalentValueError, equivalentPayment } = useEquivalentValueContext();

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
          computeEquivalentValueError &&
          <Typography>
            {computeEquivalentValueError.code}
          </Typography>
        }
        {
          !loading &&
          !computeEquivalentValueError &&
          equivalentPayment &&
          <Typography>
            Amount: {equivalentPayment.amount} - Period: {equivalentPayment.position}
          </Typography>
        }
      </Stack>
    </Paper >
  )
}
