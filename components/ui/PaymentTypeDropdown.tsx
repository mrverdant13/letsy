import { FC, useMemo } from 'react';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { IPaymentType } from '../../interfaces/payment-type';

interface Props {
  value: (IPaymentType | null);
  onSelection?: (type: (IPaymentType | null)) => void;
}

const labelId: string = 'payment-type-dropdown-label';
const label: string = 'Payment type';

export const PaymentTypeDropdown: FC<Props> = ({
  value,
  onSelection,
}) => {
  const valueString = useMemo(
    () => value ?? '',
    [value],
  );
  const onChange = (event: SelectChangeEvent) => {
    const maybeType = IPaymentType.parse(event.target.value);
    if (onSelection) onSelection(maybeType);
  };
  return (
    <FormControl
      fullWidth
    >
      <InputLabel
        id={labelId}
      >
        {label}
      </InputLabel>
      <Select
        id="payment-type"
        value={valueString}
        onChange={onChange}
        labelId={labelId}
        label={label}
      >
        {
          IPaymentType.VALUES.map(
            (type) => (
              <MenuItem
                key={type}
                value={type}
              >
                {IPaymentType.getLabel(type)}
              </MenuItem>
            ),
          )
        }
      </Select>
    </FormControl>
  )
}
