import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { FC, useState, useMemo } from 'react';

import { Stack, Box, Typography } from '@mui/material';
import { unstable_getServerSession } from 'next-auth';

import { BasePageLayout } from '../../../components/layouts/BasePageLayout';
import { EquivalentValueProvider } from '../../../context/equivalent-value/EquivalentValueProvider';
import { useEquivalentValueContext } from '../../../context/equivalent-value/EquivalentValueContext';
import { UniformSeriesPayment } from '../../../components/ui/UniformSeriesPayment';
import { IPaymentType } from '../../../interfaces/payment-type';
import { SinglePayment } from '../../../components/ui/SinglePayment';
import { PeriodsBar } from '../../../components/ui/PeriodsBar';
import { EquivalenceToolbar } from '../../../components/ui/EquivalenceToolbar';
import { AddPaymentButton } from '../../../components/ui/AddPaymentButton';
import { authOptions } from '../../api/auth/[...nextauth]';

const EquivalentValueGroupsPage: NextPage = () => {
  return (
    <EquivalentValueProvider>
      <BasePageLayout
        title="Equivalent Value Calculation - Groups"
        description="Payment groups"
      >
      </BasePageLayout>
    </EquivalentValueProvider>
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

