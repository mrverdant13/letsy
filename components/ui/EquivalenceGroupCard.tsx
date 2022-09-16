import { FC } from "react";

import { Card, CardActionArea, CardContent, SxProps, Theme, Typography } from "@mui/material"

import { IPaymentGroup } from "../../interfaces/payment-group";

const baseSx: SxProps<Theme> = {};

interface Props {
  group: IPaymentGroup;
  sx?: SxProps<Theme>;
}

export const EquivalenceGroupCard: FC<Props> = ({ group, sx = {} }) => {
  const { name, payments } = group;
  return (
    <Card
      sx={{
        ...baseSx,
        ...sx,
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body1" component="p">
            Payments: {payments.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
