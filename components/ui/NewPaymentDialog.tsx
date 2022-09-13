import { FC, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme, Box, Stack } from '@mui/material';

import { PaymentTypeDropdown } from './PaymentTypeDropdown';
import { IPaymentType } from '../../interfaces/payment-type';
import { PaymentAttributes } from './PaymentAttributes';

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
  const [type, setType] = useState<IPaymentType | null>(null);
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      fullScreen={fullScreen}
      aria-labelledby={titleId}
    >
      <Box
        sx={{
          minWidth: 400,
        }}
      >
        <DialogTitle
          id={titleId}
        >
          Add new payment
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={3}
            padding={1}
          >
            <PaymentTypeDropdown
              value={type}
              onSelection={(maybeType) => setType(maybeType)}
            />
            {
              type &&
              <PaymentAttributes type={type} />
            }
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>
            Add
          </Button>
        </DialogActions>
      </Box>
    </Dialog >
  )
}

