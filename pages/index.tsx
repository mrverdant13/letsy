import type { NextPage } from 'next'

import { Typography, Box, Stack } from '@mui/material';

import { BasePageLayout } from '../components/layouts';
import Image from 'next/image';

const HomePage: NextPage = () => {
  return (
    <BasePageLayout
      sx={{
        alignItems: 'start',
        justifyContent: 'end',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        <Image
          src="/home-bg.jpg"
          layout="fill"
          objectFit="cover"
          alt="Letsy App"
        />
      </Box>
      <Stack
        m={10}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: 60,
              sm: 80,
              md: 100,
            },
            fontWeight: 'bold',
          }}
        >
          Letsy
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: 24,
              sm: 32,
              md: 40,
            },
          }}
        >
          Tools for better decisions
        </Typography>
      </Stack>
    </BasePageLayout >
  )
}

export default HomePage;
