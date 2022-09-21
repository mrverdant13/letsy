import { FC, MouseEvent, useEffect, useState } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { IPayment } from '../../interfaces/payment';
import { IPaymentType } from '../../interfaces/payment-type';
import { SinglePayment } from './SinglePayment';
import { UniformSeriesPayment } from './UniformSeriesPayment';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import { PaymentDialog } from './PaymentDialog';

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
  const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState<boolean>(false);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState<boolean>(false);
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

  const openRemoveDialog = () => {
    setRemoveDialogIsOpen(true);
    closeContextMenu();
  }

  const closeRemoveDialog = () => {
    setRemoveDialogIsOpen(false);
    closeContextMenu();
  }

  const openEditDialog = () => {
    setEditDialogIsOpen(true);
    closeContextMenu();
  }

  const closeEditDialog = () => {
    setEditDialogIsOpen(false);
    closeContextMenu();
  }

  const removePayment = () => {
    deletePayment(payment.name);
    closeContextMenu();
    closeRemoveDialog();
  }

  useEffect(
    () => {
      closeRemoveDialog();
      closeEditDialog();
    },
    [JSON.stringify(payment)]
  );

  return (
    <>
      <Box
        key={JSON.stringify(payment)}
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
        <MenuItem onClick={openRemoveDialog}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
        <MenuItem onClick={openEditDialog}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
      </Menu>
      <Dialog
        open={removeDialogIsOpen}
        onClose={closeRemoveDialog}
        aria-labelledby="removal-confirmation-dialog-title"
        aria-describedby="removal-confirmation-dialog-description"
      >
        <DialogTitle id="removal-confirmation-dialog-title">
          Remove payment
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="removal-confirmation-dialog-description">
            Are you sure you want to delete the <u><em><strong>{payment.name}</strong></em></u> payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeRemoveDialog}
          >
            Cancel
          </Button>
          <Button
            onClick={removePayment}
            color="error"
            variant="outlined"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <PaymentDialog
        isOpen={editDialogIsOpen}
        close={closeEditDialog}
        payment={payment}
      />
    </>
  );
}
