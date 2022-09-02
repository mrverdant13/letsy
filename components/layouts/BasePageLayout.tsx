import { FC } from "react"

import Head from "next/head";

import { Box, Link, Stack, SxProps, Theme } from "@mui/material";
import { LetsyAppBar } from "../ui/LetsyAppBar";

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  displayFooter?: boolean;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

const baseSx: SxProps<Theme> = {
  height: "100%",
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
  displayFooter = true,
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
      <Stack
        direction="column"
        sx={{
          height: '100vh',
        }}
      >
        <LetsyAppBar />
        <Box
          sx={{
            ...baseSx,
            ...sx,
          }}
        >
          {children}
        </Box>
      </Stack>
      {
        displayFooter &&
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
      }
    </Box>
  )
}
