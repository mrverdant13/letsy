import { Add } from "@mui/icons-material"
import { Fab, Tooltip } from "@mui/material"

export const AddPaymentButton = () => {
  return (
    <Tooltip title="Add payment">
      <Fab
        color="primary"
        aria-label="Add payment"
      >
        <Add />
      </Fab>
    </Tooltip>
  )
}
