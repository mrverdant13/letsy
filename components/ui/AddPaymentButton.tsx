import { useState } from "react";

import { Add } from "@mui/icons-material"
import { Fab, Tooltip } from "@mui/material"

import { NewPaymentDialog } from "./NewPaymentDialog"

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
      <NewPaymentDialog
        isOpen={dialogIsOpen}
        close={close}
      />
    </>
  )
}
