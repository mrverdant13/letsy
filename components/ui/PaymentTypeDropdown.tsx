import { FC, useMemo } from 'react';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField, useFormikContext } from 'formik';

import { IPaymentType } from '../../interfaces/payment-type';

const labelId: string = 'payment-type-dropdown-label';

interface PaymentTypeDropdownProps {
  id: string;
  name: string;
  label: string;
}

export const PaymentTypeDropdown: FC<PaymentTypeDropdownProps> = (props) => {
  const resultingProps = { ...props, type: 'text' };
  const label = resultingProps.label;
  const [field, meta, helpers] = useField(resultingProps);
  const { isSubmitting } = useFormikContext();
  const resultingField = { ...field, value: field.value ?? '' };
  const showError = useMemo(
    () => Boolean(meta.touched && meta.error),
    [meta.touched, meta.error],
  );
  return (
    <FormControl
      required
      fullWidth
      error={showError}
      disabled={isSubmitting}
    >
      <InputLabel
        id={labelId}
      >
        {label}
      </InputLabel>
      <Select
        {...resultingField}
        {...resultingProps}
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
      {
        showError &&
        <FormHelperText>
          {meta.error}
        </FormHelperText>
      }
    </FormControl>
  )
}
