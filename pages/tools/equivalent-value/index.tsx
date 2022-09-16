import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { unstable_getServerSession } from 'next-auth';
import { Box, Typography, Stack, Pagination, PaginationItem } from '@mui/material';

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
  const { offset, limit } = useMemo(
    () => {
      const unsafeOffset = parseInt(`${query.offset}`);
      const unsafeLimit = parseInt(`${query.limit}`);
      return {
        offset: isNaN(unsafeOffset) ? 0 : unsafeOffset,
        limit: isNaN(unsafeLimit) ? 50 : unsafeLimit,
      };
    },
    [query],
  );
  const { loading, groupsPage, error, getGroups } = useEquivalenceGroupsContext();
  useEffect(
    () => {
      getGroups({ offset, limit });
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
      {groupsPage &&
        (() => {
          const currentPage = Math.ceil((offset + 1) / limit);
          const maxPage = Math.ceil(groupsPage.count / limit);
          const pagination = (
            <Pagination
              page={currentPage}
              count={maxPage}
              onChange={(e, value) => {
                const newOffset = (value - 1) * limit;
                router.push(`equivalent-value?offset=${newOffset}&limit=${limit}`);
              }}
            />
          );
          return (
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              {pagination}
              <EquivalenceGroupsList groups={groupsPage.groups} />
              {pagination}
            </Stack>
          );
        })()
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

