import { FC } from 'react';

import { Grid } from "@mui/material";

import { IPaymentGroup } from "../../interfaces/payment-group";
import { EquivalenceGroupCard } from './EquivalenceGroupCard';

interface Props {
  groups: IPaymentGroup[];
}

export const EquivalenceGroupsList: FC<Props> = ({ groups }) => {
  return (
    <Grid container spacing={2} px={5} pb={8}>
      {groups.map((group) => (
        <Grid
          key={group._id}
          item
          xs={12}
          sm={6}
          md={4}
        >
          <EquivalenceGroupCard
            group={group}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}
