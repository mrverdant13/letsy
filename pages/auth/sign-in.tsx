import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { FC } from 'react';

import { getProviders, signIn } from "next-auth/react"
import { Button, Typography } from '@mui/material';
import { unstable_getServerSession } from 'next-auth';
import { GitHub, Google } from "@mui/icons-material";

import { BasePageLayout } from "../../components/layouts";
import { authOptions } from '../api/auth/[...nextauth]';

type ClientSafeProviders = Awaited<ReturnType<typeof getProviders>>;

interface PageProps {
  providers: ClientSafeProviders;
}

const SignInPage: NextPage<PageProps> = ({ providers }) => {
  return (
    <BasePageLayout
      tabTitle="Sign In"
      description="Sign in to your account."
      sx={{
        p: 2,
      }}
    >
      <SignInPageContent providers={providers} />
    </BasePageLayout>
  );
}
export default SignInPage;

const SignInPageContent: FC<PageProps> = ({ providers }) => {
  if (!providers) {
    return (
      <Typography variant="h4" textAlign="center">
        No sign-in methods available
      </Typography>
    );
  }
  return (
    <>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          mb: 5,
        }}
      >
        Sign in to your account
      </Typography>
      {Object.values(providers).map((provider) => {
        const icon = (() => {
          switch (provider.id) {
            case 'github':
              return <GitHub />;
            case 'google':
              return <Google />;
            default:
              return null;
          }
        })();
        return (
          <div key={provider.name}>
            <Button
              variant="contained"
              onClick={() => signIn(provider.id)}
              endIcon={icon}
              sx={{
                my: 1,
              }}
            >
              Sign in with {provider.name}
            </Button>
          </div>
        );
      })}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/auth/profile',
        permanent: false,
      },
    };
  }
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

