import { AppBar, Container, Stack, Toolbar } from "@mui/material"

import { HomeButton } from "./HomeButton"
import { ProfileButton } from "./ProfileButton"

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
            <ProfileButton />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
