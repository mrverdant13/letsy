import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { FC, useState, useMemo } from 'react';

import { unstable_getServerSession } from 'next-auth';

import { BasePageLayout } from '../../../components/layouts/BasePageLayout';
import { authOptions } from '../../api/auth/[...nextauth]';
import { AddPaymentGroupButton } from '../../../components/ui/AddPaymentGroupButton';
import { EquivalentValueGroupsProvider } from '../../../context/equivalent-value-groups/EquivalentValueGroupsProvider';
import { EquivalenceGroupsProvider } from '../../../context/equivalence-groups/EquivalenceGroupsProvider';

const EquivalentValueGroupsPage: NextPage = () => {
  return (
    <EquivalenceGroupsProvider>
      <EquivalentValueGroupsProvider>
        <BasePageLayout
          title="Equivalent Value Calculation - Groups"
          description="Payment groups"
        >
          <AddPaymentGroupButton />
        </BasePageLayout>
      </EquivalentValueGroupsProvider>
    </EquivalenceGroupsProvider>
  );
}
export default EquivalentValueGroupsPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
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
    props: {},
  };
}

