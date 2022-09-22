import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { FC, useState } from 'react';
import Image from 'next/image';

import { signOut } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { Avatar, Box, Button, Skeleton, Tooltip, Typography } from '@mui/material';

import { authOptions } from '../api/auth/[...nextauth]';
import { BasePageLayout } from '../../components/layouts/BasePageLayout';
import { IUser } from '../../interfaces/users';

interface PageProps {
  user: IUser,
}

const ProfilePage: NextPage<PageProps> = ({ user }) => {
  return (
    <BasePageLayout sx={{ p: 3 }}>
      <ProfilePageContent user={user} />
    </BasePageLayout>
  );
}
export default ProfilePage;

export const ProfilePageContent: FC<PageProps> = ({ user }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
  const avatarSide = {
    xs: 100,
    sm: 200,
  };
  return (
    <>
      <Typography
        textAlign="center"
        sx={{
          pb: {
            xs: 2,
            sm: 5,
          },
          typography: {
            xs: 'h5',
            sm: 'h4',
          }
        }}
      >
        Your Profile
      </Typography>
      <Avatar
        sx={{
          display: 'block',
          height: avatarSide,
          width: avatarSide,
        }}
      >
        {
          user.image &&
          <Image
            // width={300}
            // height={300}
            // objectFit="fill"
            layout="fill"
            src={user.image}
            alt={user.name ?? user.email}
            title={user.name ?? user.email}
          />
        }
      </Avatar>
      <Typography
        textAlign="center"
        sx={{
          mt: 2,
          typography: {
            xs: 'body1',
            sm: 'h5',
          },
        }}
      >
        {user.name}
      </Typography>
      <Tooltip
        title={
          passwordIsVisible
            ? 'Hide email'
            : 'Show email'
        }
        sx={{
          mb: 2,
        }}
      >
        <Box
          onClick={() => setPasswordIsVisible((v) => !v)}
        >
          <Typography
            textAlign="center"
            sx={{
              typography: {
                xs: 'body2',
                sm: 'h6',
              },
            }}
          >
            {
              passwordIsVisible
                ?
                user.email
                :
                <Skeleton animation={false} width={200} />
            }
          </Typography>
        </Box>
      </Tooltip>
      <Button
        onClick={() => signOut()}
        sx={{
          my: 1,
        }}
      >
        Log out
      </Button>
    </>
  )
}


export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user as IUser,
    }
  }
}
