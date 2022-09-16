import { useState } from "react";

import { Add, AddCircle } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Tooltip, Typography } from "@mui/material"

import { useEquivalentValueGroupsContext } from '../../context/equivalent-value-groups/context';
import { NewPaymentGroupDialog } from "./NewPaymentGroupDialog";

const ariaLabel = "create payment group";

export const AddPaymentGroupButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const open = () => {
    setDialogIsOpen(true);
  };
  const close = () => {
    setDialogIsOpen(false);
  };

  return (
    <>
      <Tooltip
        title="Create payment group"
      >
        <Fab
          aria-label={ariaLabel}
          variant="circular"
          onClick={open}
          sx={{
            display: {
              xs: "flex",
              sm: "none",
            },
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
          }}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Fab
        aria-label={ariaLabel}
        variant="extended"
        onClick={open}
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        }}
      >
        <AddCircle sx={{ mr: 1 }} />
        <Typography variant="body1">
          Create payment group
        </Typography>
      </Fab>
      <NewPaymentGroupDialog
        isOpen={dialogIsOpen}
        close={close}
      />
    </>
  )
}
