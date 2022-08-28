import { useEffect } from 'react'
import { NextPage } from 'next';

import { signOut } from 'next-auth/react';

const SignOutPage: NextPage = () => {
  useEffect(
    () => {
      signOut({ callbackUrl: '/' });
    },
    []
  );
  return (
    <>
    </>
  )
}
export default SignOutPage;
