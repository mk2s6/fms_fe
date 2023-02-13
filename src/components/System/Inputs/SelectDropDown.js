import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export default function SelectDropDown({ items, size, label, id, fullWidth, readOnly, defaultValue, ...props }) {
  return (
    <FormControl fullWidth={fullWidth} size={size}>
      {!readOnly && (
        <InputLabel sx={{ textTransform: 'capitalize' }} id={`label-${id}`}>
          {label}
        </InputLabel>
      )}
      <Select {...(!readOnly ? { labelId: `label-${id}` } : {})} id={`sdd-label-${id}`} {...props} inputProps={readOnly ? { readOnly: true } : {}}>
        {items.map((i) => (
          <MenuItem key={i.id} value={i.id}>
            <Typography variant="span">{i.value}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
