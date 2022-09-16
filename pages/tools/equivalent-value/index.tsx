import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { unstable_getServerSession } from 'next-auth';
import { Box, Typography } from '@mui/material';

import { BasePageLayout } from '../../../components/layouts/BasePageLayout';
import { authOptions } from '../../api/auth/[...nextauth]';
import { AddPaymentGroupButton } from '../../../components/ui/AddPaymentGroupButton';
import { EquivalentValueGroupsProvider } from '../../../context/equivalent-value-groups/EquivalentValueGroupsProvider';
import { EquivalenceGroupsProvider } from '../../../context/equivalence-groups/EquivalenceGroupsProvider';
import { useEquivalenceGroupsContext } from '../../../context/equivalence-groups/context';
import { EquivalenceGroupsList } from '../../../components/ui/EquivalenceGroupsList';

const EquivalentValueGroupsPage: NextPage = () => {
  return (
    <EquivalenceGroupsProvider>
      <EquivalentValueGroupsProvider>
        <BasePageLayout
          title="Equivalent Value Calculation - Groups"
          description="Payment groups"
          displayFooter={false}
        >
          <EquivalentValueGroupsPageContent />
          <AddPaymentGroupButton />
        </BasePageLayout>
      </EquivalentValueGroupsProvider>
    </EquivalenceGroupsProvider>
  );
}
export default EquivalentValueGroupsPage;

const EquivalentValueGroupsPageContent = () => {
  const router = useRouter();
  const query = router.query;
  const offset: number = parseInt(`${query.offset}`);
  const limit: number = parseInt(`${query.limit}`);
  const { loading, groupsPage, error, getGroups } = useEquivalenceGroupsContext();
  useEffect(
    () => {
      getGroups({
        offset: isNaN(offset) ? undefined : offset,
        limit: isNaN(limit) ? undefined : limit,
      });
    },
    [offset, limit],
  );

  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <Typography sx={{ mx: 5, my: 2 }} variant="h5">
        Groups
      </Typography>
      {/* <Divider /> */}
      {groupsPage &&
        <EquivalenceGroupsList groups={groupsPage.groups} />
      }
      {loading &&
        <Box sx={{ p: { xs: 'auto', sm: 2 } }}>
          <Typography variant="h5" textAlign="center">
            Loading
          </Typography>
        </Box>
      }
      {error &&
        <Typography variant="h5" textAlign="center">
          {error.code}
        </Typography>
      }
    </Box>
  );
}

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

