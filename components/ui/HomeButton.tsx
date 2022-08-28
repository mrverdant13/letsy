import Link from 'next/link'

import { Home } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const HomeButton = () => {
  return (
    <Link href="/" passHref>
      <IconButton aria-label="Go to home page">
        <Home />
      </IconButton>
    </Link>
  )
}
