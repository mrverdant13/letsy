import type { NextPage } from 'next'

import { Typography } from '@mui/material';

import { BasePageLayout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <BasePageLayout>
      <Typography
        align="center"
        variant="h1"
      >
        Welcome to Letsy!
      </Typography>
    </BasePageLayout >
  )
}

export default HomePage;
