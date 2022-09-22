import { FC, useMemo } from 'react';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField, useFormikContext } from 'formik';

import { IPaymentTypeUtils } from '../../interfaces/payment-type';

const labelId: string = 'payment-type-dropdown-label';

interface PaymentTypeDropdownProps {
  id: string;
  name: string;
  label: string;
  isEditing: boolean;
}

export const PaymentTypeDropdown: FC<PaymentTypeDropdownProps> = (props) => {
  const { isEditing, ...resultingProps } = { ...props, type: 'text' };
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
      disabled={isSubmitting || isEditing}
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
          IPaymentTypeUtils.VALUES.map(
            (type) => (
              <MenuItem
                key={type}
                value={type}
              >
                {IPaymentTypeUtils.getLabel(type)}
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
