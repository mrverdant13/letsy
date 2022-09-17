import { FC, ReactNode } from 'react';

import { EquivalenceGroupContext } from './context';
import { IPaymentGroup } from '../../interfaces/payment-group';

interface Props {
  children: ReactNode;
  initialGroup: IPaymentGroup;
};

export const EquivalenceGroupProvider: FC<Props> = ({ children, initialGroup }) => {
  return (
    <EquivalenceGroupContext.Provider
      value={{
        group: initialGroup,
      }}
    >
      {children}
    </EquivalenceGroupContext.Provider>
  );
}
