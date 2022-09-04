import { NextPage } from 'next';
import React, { FC, useState, useMemo } from 'react';

import { Stack, Box } from '@mui/material';

import { BasePageLayout } from '../../../components/layouts/BasePageLayout';
import { EquivalentValueProvider } from '../../../context/equivalent-value/EquivalentValueProvider';
import { useEquivalentValueContext } from '../../../context/equivalent-value/EquivalentValueContext';
import { UniformSeriesPayment } from '../../../components/ui/UniformSeriesPayment';
import { IPaymentType } from '../../../interfaces/payment-type';
import { SinglePayment } from '../../../components/ui/SinglePayment';
import { PeriodsBar } from '../../../components/ui/PeriodsBar';
import { EquivalenceToolbar } from '../../../components/ui/EquivalenceToolbar';

const EquivalentValuePage: NextPage = () => {
  return (
    <EquivalentValueProvider>
      <BasePageLayout
        title="Equivalent Value Calculator"
        description="Calculate the equivalent value of a set of payments in a given time."
        displayFooter={false}
        sx={{
          display: undefined,
        }}
      >
        <EquivalentValuePageContent />
      </BasePageLayout>
    </EquivalentValueProvider>
  );
}
export default EquivalentValuePage;

export const EquivalentValuePageContent: FC = () => {
  const [blockWidth, setBlockWidth] = useState<number>(50);
  const [blockHeight, setBlockHeight] = useState<number>(50);
  const { group } = useEquivalentValueContext();
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
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <EquivalenceToolbar />
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
          <PeriodsBar
            positionsCount={maxPosition + 10}
            blockWidth={blockWidth}
          />
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
                    <Box
                      key={p.name}
                      sx={{
                        height: blockHeight,
                      }}
                    >
                      {
                        (() => {
                          switch (p.type) {
                            case IPaymentType.single: {
                              return <SinglePayment
                                key={p.name}
                                payment={p}
                                blockWidth={blockWidth}
                                blockHeight={blockHeight}
                              />;
                            }
                            case IPaymentType.uniformSeries: {
                              return <UniformSeriesPayment
                                key={p.name}
                                payment={p}
                                blockWidth={blockWidth}
                                blockHeight={blockHeight}
                              />;
                            }
                          }
                        })()
                      }
                    </Box>
                  )
                })
              }
            </Stack>
          </Box>
          <PeriodsBar
            positionsCount={maxPosition + 10}
            blockWidth={blockWidth}
          />
        </Stack>
      </Box>
    </Stack >
  );
}
