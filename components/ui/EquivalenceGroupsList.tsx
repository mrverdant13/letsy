import { FC } from 'react';

import { Box, Card, Grid, Skeleton } from "@mui/material";

import { IPaymentGroup } from "../../interfaces/payment-group";
import { EquivalenceGroupCard } from './EquivalenceGroupCard';

type Props =
  | { type: 'loaded'; groups: IPaymentGroup[]; }
  | { type: 'loading'; skeletonsCount: number; }
  ;

export const EquivalenceGroupsList: FC<Props> = (props) => {
  const type = props.type;
  return (
    <Grid container spacing={2} px={5}>
      {
        type === 'loading' &&
        Array.from(
          { length: props.skeletonsCount },
          (x, i) => (
            <Grid
              key={i}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <Skeleton variant="rounded" width="100%" height={100} />
            </Grid>
          ),
        )
      }
      {
        type === 'loaded' &&
        props.groups.map((group) => (
          <GridItem
            key={group._id}
            group={group}
          />
        ))
      }
    </Grid >
  )
}

interface GridItemProps {
  group: IPaymentGroup;
}

const GridItem: FC<GridItemProps> = ({ group }) => {
  return (
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

  );
}