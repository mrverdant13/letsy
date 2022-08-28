import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { darkTheme } from '../themes';

import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp
