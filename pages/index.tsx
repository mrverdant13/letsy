import type { NextPage } from 'next'

import { Typography, Button } from '@mui/material';

import { BasePageLayout } from '../components/layouts';
import httpClient from '../apis/_client';

const HomePage: NextPage = () => {
  const onClick = () => {
    httpClient.post(
      '/equivalent-value/groups',
      {
        name: "A payment group",
        interest: 1.2,
        payments: [
          {
            type: "single",
            name: "A single payment",
            position: 0,
            amount: 1.0,
          },
        ],
      },
    );
  };
  return (
    <BasePageLayout>
      <Typography
        align="center"
        variant="h1"
      >
        Welcome to Letsy!
      </Typography>
      <Button
        onClick={onClick}
      >
        TEST
      </Button>
    </BasePageLayout >
  )
}

export default HomePage;
