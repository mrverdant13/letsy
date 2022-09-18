import { FC, MouseEvent, useState } from 'react';

import { Box, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { IPayment } from '../../interfaces/payment';
import { IPaymentType } from '../../interfaces/payment-type';
import { SinglePayment } from './SinglePayment';
import { UniformSeriesPayment } from './UniformSeriesPayment';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';

interface Props {
  payment: IPayment;
  blockWidth: number;
  blockHeight: number;
}

interface ContextMenuCoordinates {
  x: number;
  y: number;
}

export const Payment: FC<Props> = ({ payment, blockWidth, blockHeight }) => {
  const { deletePayment } = useEquivalenceGroupContext();
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState<ContextMenuCoordinates | undefined>(undefined);
  const contextMenuIsOpen = Boolean(contextMenuCoordinates);

  const openContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    if (contextMenuCoordinates != undefined) return;
    setContextMenuCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  }

  const closeContextMenu = () => {
    setContextMenuCoordinates(undefined);
  }

  const removePayment = () => {
    deletePayment(payment.name);
    closeContextMenu();
  }

  return (
    <>
      <Box
        key={payment.name}
        sx={{
          height: blockHeight,
        }}
        onContextMenu={openContextMenu}
      >
        {
          (() => {
            switch (payment.type) {
              case IPaymentType.single: {
                return <SinglePayment
                  key={payment.name}
                  payment={payment}
                  blockWidth={blockWidth}
                  blockHeight={blockHeight}
                />;
              }
              case IPaymentType.uniformSeries: {
                return <UniformSeriesPayment
                  key={payment.name}
                  payment={payment}
                  blockWidth={blockWidth}
                  blockHeight={blockHeight}
                />;
              }
            }
          })()
        }
      </Box>
      <Menu
        open={contextMenuIsOpen}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenuCoordinates != undefined
            ? { top: contextMenuCoordinates.y, left: contextMenuCoordinates.x }
            : undefined
        }
      >
        <MenuItem onClick={removePayment}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
