import { useState, FC } from 'react';
import Link from 'next/link';

import { useSession } from "next-auth/react"

import { IconButton, Tooltip, Avatar, Menu, MenuItem, CircularProgress, Button } from '@mui/material';

import { IUser } from '../../interfaces/users';

export const ProfileButton = () => {
  const { data: session, status } = useSession();

  switch (status) {
    case 'loading':
      return <CircularProgress />;
    case 'unauthenticated':
      return <UnauthenticatedProfileButton />;
    case 'authenticated':
      return <AuthenticatedProfileButton user={session.user as IUser} />;
  }

}

const UnauthenticatedProfileButton = () => {
  return (
    <Link href="/auth/sign-in" passHref>
      <Button>
        Sign in
      </Button>
    </Link>
  );
}

interface AuthenticatedProfileButtonProps {
  user: IUser;
}

const AuthenticatedProfileButton: FC<AuthenticatedProfileButtonProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const optionsAreVisible = Boolean(anchorEl);

  const open = (e: any) => {
    setAnchorEl(e.currentTarget);
  }

  const close = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title="Account">
        <IconButton
          onClick={open}
          sx={{ p: 0 }}
        >
          <Avatar
            alt={user.name ?? user.email}
            src={user.image}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={optionsAreVisible}
        onClose={close}
      >
        <Link href="/auth/profile" passHref>
          <MenuItem onClick={close}>
            My profile
          </MenuItem>
        </Link>
        <Link href="/api/auth/signout" passHref>
          <MenuItem onClick={close}>
            Sign out
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}