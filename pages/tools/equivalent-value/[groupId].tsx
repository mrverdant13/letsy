import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { FC, useState, useMemo, ChangeEvent, KeyboardEvent, useEffect } from 'react';

import { Stack, Box, Typography, TextField } from '@mui/material';
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
import { PaymentGroupNameValidationSchema } from '../../../validation-schemas/payment-group';
import usePrevious from '../../../hooks/usePrevious';

interface Props {
  group: IPaymentGroup;
};

const EquivalentValuePage: NextPage<Props> = ({ group: initialGroup }) => {
  return (
    <EquivalenceGroupProvider
      initialGroup={initialGroup}
    >
      <EquivalenceProvider>
        <EquivalentValuePageContent />
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
  const { group: { payments, name } } = useEquivalenceGroupContext();
  return (
    <BasePageLayout
      tabTitle={`Equivalence - ${name}`}
      appBarTitle={<AppBarTitle />}
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
  );
}

const AppBarTitle: FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { loading: isLoading, group: { name }, errors, updateName } = useEquivalenceGroupContext();
  const [inMemoryName, setInMemoryName] = useState(name);
  const isValid = PaymentGroupNameValidationSchema.safeParse(inMemoryName).success;
  const wasLoading = usePrevious(isLoading);
  const hasErrors = errors.length > 0;
  const hasBeenChanged = name !== inMemoryName;

  useEffect(
    () => {
      if (isLoading) return;
      if (!wasLoading) return;
      if (hasErrors) return;
      setIsEditing(false);
    },
    [isLoading, wasLoading, hasErrors, hasBeenChanged]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInMemoryName(value);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isValid) return;
    if (event.key !== 'Enter') return;
    if (name === inMemoryName) setIsEditing(false);
    else updateName(inMemoryName);
  }

  const onBlur = () => {
    setInMemoryName(name);
    setIsEditing(false);
  }

  return (
    <Box
      sx={{
        mx: 1,
      }}
    >
      {
        isEditing
          ?
          <TextField
            autoFocus
            required
            disabled={isLoading}
            id="name"
            type="text"
            value={inMemoryName}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            size="small"
            error={!isValid}
            fullWidth
          />
          :
          <Typography
            variant="h6"
            onDoubleClick={() => setIsEditing(true)}
          >
            {name}
          </Typography>
      }
    </Box>
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
                    key={p.name}
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
