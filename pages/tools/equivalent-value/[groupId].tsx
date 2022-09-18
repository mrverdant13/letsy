import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { FC, useState, useMemo } from 'react';

import { Stack, Box, Typography } from '@mui/material';
import { unstable_getServerSession } from 'next-auth';

import { BasePageLayout } from '../../../components/layouts/BasePageLayout';
import { UniformSeriesPayment } from '../../../components/ui/UniformSeriesPayment';
import { IPaymentType } from '../../../interfaces/payment-type';
import { SinglePayment } from '../../../components/ui/SinglePayment';
import { PeriodsBar } from '../../../components/ui/PeriodsBar';
import { EquivalenceToolbar } from '../../../components/ui/EquivalenceToolbar';
import { AddPaymentButton } from '../../../components/ui/AddPaymentButton';
import { authOptions } from '../../api/auth/[...nextauth]';
import { EquivalenceGroupProvider } from '../../../context/equivalence-group/EquivalenceGroupProvider';
import { IPaymentGroup } from '../../../interfaces/payment-group';
import { ObjectIdStringValidationSchema } from '../../../validation-schemas/object-id';
import { PaymentGroupModel } from '../../../database/models/payment-group';
import { useEquivalenceGroupContext } from '../../../context/equivalence-group/context';
import { EquivalenceProvider } from '../../../context/equivalence/EquivalenceProvider';
import { Payment } from '../../../components/ui/Payment';

interface Props {
  group: IPaymentGroup;
};

const EquivalentValuePage: NextPage<Props> = ({ group: initialGroup }) => {
  return (
    <EquivalenceGroupProvider
      initialGroup={initialGroup}
    >
      <EquivalenceProvider>
        <BasePageLayout
          title="Equivalent Value Calculator"
          description="Calculate the equivalent value of a set of payments in a given time."
          displayFooter={false}
          sx={{
            display: undefined,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          >
            <EquivalentValuePageContent />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 15,
              right: 15,
            }}
          >
            <AddPaymentButton />
          </Box>
        </BasePageLayout>
      </EquivalenceProvider>
    </EquivalenceGroupProvider>
  );
}
export default EquivalentValuePage;

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    };
  }
  const { groupId } = context.params as { groupId: string };
  try {
    const safeGroupId = ObjectIdStringValidationSchema().parse(groupId);
    const group = await PaymentGroupModel.findById(safeGroupId);
    if (group == null) throw new Error(`Not Found`);
    if (group.owner?.toString() !== session.userId) throw new Error(`Forbidden`);
    return {
      props: {
        group: JSON.parse(JSON.stringify(group)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        destination: '/tools/equivalent-value',
        permanent: false,
      },
    };
  }
}

const EquivalentValuePageContent: FC = () => {
  const { group: { payments } } = useEquivalenceGroupContext();
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <EquivalenceToolbar />
      {
        payments.length === 0
          ? <NoPaymentsMessage />
          : <EquivalentValueChart />
      }
    </Stack>
  );
}

const NoPaymentsMessage: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <Typography
        textAlign="center"
        sx={{
          m: 'auto',
          typography: {
            xs: 'h5',
            sm: 'h4',
          },
        }}
      >
        No payments
      </Typography>
    </Box>
  );
}

const EquivalentValueChart: FC = () => {
  const [blockWidth, setBlockWidth] = useState<number>(50);
  const [blockHeight, setBlockHeight] = useState<number>(50);
  const { group } = useEquivalenceGroupContext();
  const maxPosition = useMemo(
    () => Math.max(...group.payments.map<number>(p => {
      switch (p.type) {
        case IPaymentType.single:
          return p.position;
        case IPaymentType.uniformSeries:
          return p.position + p.periods;
      }
    })),
    [group.payments],
  );

  const periodsBar = (
    <PeriodsBar
      positionsCount={maxPosition + 10}
      blockWidth={blockWidth}
    />
  );

  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        overflowX: 'auto',
        px: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          position: 'absolute',
          height: '100%',
          overflowX: 'auto',
        }}
      >
        {
          Array.from(
            { length: maxPosition + 10 },
            (x, i) => (
              <Box
                key={i}
                sx={{
                  width: blockWidth,
                  borderLeft: '.2px solid white',
                  opacity: .25,
                }}
              >
              </Box>
            ),
          )
        }
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          height: '100%',
        }}
      >
        {periodsBar}
        <Box
          sx={{
            position: 'relative',
            flex: 1,
            overflowY: 'auto',
            py: 2,
          }}
        >
          <Stack
            spacing={2}
            sx={{
              position: 'absolute',
            }}
          >
            {
              group.payments.map<JSX.Element>((p, i) => {
                return (
                  <Payment
                    payment={p}
                    blockWidth={blockWidth}
                    blockHeight={blockHeight}
                  />
                );
              })
            }
          </Stack>
        </Box>
        {periodsBar}
      </Stack>
    </Box>
  );
}
