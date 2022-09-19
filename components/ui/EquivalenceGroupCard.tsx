import Link from "next/link";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";

import { Card, CardActionArea, CardContent, IconButton, Stack, SxProps, TextField, Theme, Tooltip, Typography } from "@mui/material"

import { IPaymentGroup } from "../../interfaces/payment-group";
import { Edit } from "@mui/icons-material";
import { PaymentGroupNameValidationSchema } from "../../validation-schemas/payment-group";
import { useEquivalenceGroupsContext } from "../../context/equivalence-groups/context";

const baseSx: SxProps<Theme> = {};

interface Props {
  group: IPaymentGroup;
  sx?: SxProps<Theme>;
}

export const EquivalenceGroupCard: FC<Props> = ({ group, sx = {} }) => {
  const { loading: isLoading, renameGroup } = useEquivalenceGroupsContext();
  const [actionsAreVisible, setActionsAreVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { name, payments } = group;
  const [inMemoryName, setInMemoryName] = useState(name);
  const isValid = PaymentGroupNameValidationSchema.safeParse(inMemoryName).success;

  const showActions = () => {
    if (isEditing) return;
    setActionsAreVisible(true);
  }

  const hideActions = () => {
    setActionsAreVisible(false);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInMemoryName(value);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isValid) return;
    if (event.key !== 'Enter') return;
    if (name === inMemoryName) setIsEditing(false);
    else renameGroup(group._id, inMemoryName);
  }

  const onBlur = () => {
    setInMemoryName(name);
    setIsEditing(false);
  }

  return (
    <Card
      sx={{
        ...baseSx,
        ...sx,
      }}
      onMouseOver={showActions}
      onMouseOut={hideActions}
    >
      <Link
        href={`equivalent-value/${group._id}`}
        passHref
      >
        <CardActionArea>
          <CardContent>
            {
              isEditing
                ?
                <TextField
                  autoFocus
                  required
                  disabled={isLoading}
                  id="name"
                  type="text"
                  value={inMemoryName}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                  size="small"
                  error={!isValid}
                  fullWidth
                />
                :
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>

            }
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1" component="p">
                Payments: {payments.length}
              </Typography>
              {
                actionsAreVisible &&
                <Stack
                  direction="row"
                >
                  <Tooltip title="Rename">
                    <IconButton
                      size="small"
                      onClick={
                        (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setIsEditing(true);
                        }
                      }
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}
