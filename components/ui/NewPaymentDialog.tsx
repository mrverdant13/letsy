import { FC } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const titleId = 'new-payment-dialog-title';

export const NewPaymentDialog: FC<Props> = ({
  isOpen,
  close,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      fullScreen={fullScreen}
      aria-labelledby={titleId}
    >
      <DialogTitle
        id={titleId}
      >
        Add new payment
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the payment details
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>
          Cancel
        </Button>
        <Button onClick={close}>
          Add
        </Button>
      </DialogActions>
    </Dialog >
  )
}
