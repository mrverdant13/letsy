import { AppBar, Container, Stack, Toolbar } from "@mui/material"

import { HomeButton } from "./HomeButton"
import { ProfileButton } from "./ProfileButton"
import { ToolsButton } from './ToolsButton';

export const LetsyAppBar = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",
            }}
          >
            <HomeButton />
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
