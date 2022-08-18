import { FC } from "react"

import Head from "next/head";

import { Box, Link, SxProps, Theme } from "@mui/material";

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

const baseSx: SxProps<Theme> = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const BasePageLayout: FC<Props> = ({
  title = 'Letsy',
  description = 'Analyze your investment options',
  keywords = [
    'investment',
    'analysis',
  ],
  sx = {},
  children,
}) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Head>
      <Box
        sx={{
          ...baseSx,
          ...sx,
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          display: 'flex',
          padding: 2,
          borderTop: '1px solid #eaeaea',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Link
          href="https://github.com/mrverdant13/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          Created by @mrverdant13
        </Link>
      </Box>
    </Box>
  )
}
