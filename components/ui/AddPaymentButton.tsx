import { useState } from "react";

import { Add } from "@mui/icons-material"
import { Fab, Tooltip } from "@mui/material"

import { PaymentDialog } from "./PaymentDialog"

export const AddPaymentButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const open = () => {
    setDialogIsOpen(true);
  };
  const close = () => {
    setDialogIsOpen(false);
  };

  return (
    <>
      <Tooltip title="Add payment">
        <Fab
          color="primary"
          aria-label="Add payment"
          onClick={open}
        >
          <Add />
        </Fab>
      </Tooltip>
      <PaymentDialog
        isOpen={dialogIsOpen}
        close={close}
      />
    </>
  )
}
