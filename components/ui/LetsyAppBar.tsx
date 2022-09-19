import { FC, ReactNode } from 'react';

import { AppBar, Box, Container, Stack, Toolbar, Typography } from "@mui/material"

import { HomeButton } from "./HomeButton"
import { ProfileButton } from "./ProfileButton"
import { ToolsButton } from './ToolsButton';

interface Props {
  title?: string | ReactNode;
}

export const LetsyAppBar: FC<Props> = ({ title }) => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="stretch"
            sx={{
              width: "100%",
            }}
          >
            <HomeButton />
            <Box
              sx={{
                flex: 1,
              }}
            >
              {
                title &&
                title
              }
            </Box>
            <Stack
              direction="row"
              alignItems="center"
            >
              <ToolsButton />
              <ProfileButton />
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
