import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { BasePageLayout } from '../../components/layouts/BasePageLayout';
import { Avatar, Button, Typography } from '@mui/material';
import { getSession, signOut } from 'next-auth/react';
import { FC } from 'react';
import { Session } from 'next-auth';
import { IUser } from '../../interfaces/users';
import Image from 'next/image';

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
      <Typography
        textAlign="center"
        sx={{
          pb: 2,
          typography: {
            xs: 'body2',
            sm: 'h6',
          },
        }}
      >
        {user.email}
      </Typography>
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
  const session = await getSession(context);
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
