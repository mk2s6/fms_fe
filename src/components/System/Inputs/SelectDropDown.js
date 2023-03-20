import { FormControl, InputLabel, Select, MenuItem, Typography, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SelectDropDown({ required, items, size, label, id, fullWidth, readOnly, defaultValue, addNew, addNewApi, ...props }) {
  let navigate = useNavigate();

  return (
    <FormControl sx={{ minWidth: 120 }} type='select' fullWidth={fullWidth} required={required} {...props}>
      {!readOnly && (
        <InputLabel sx={{ textTransform: 'capitalize' }} id={`label-${id}`}>
          {label}
        </InputLabel>
      )}
      <Select
        label={label}
        {...(!readOnly ? { labelId: `label-${id}` } : {})}
        id={`add-id-${id}`}
        {...props}
        inputProps={readOnly ? { readOnly: true } : {}}
      >
        {addNew && !!addNewApi && (
          <MenuItem onClick={() => {
            navigate(addNewApi)
          }}>
            <em>Add New</em>
          </MenuItem>
        )}

        <MenuItem value=''>
          <em>None</em>
        </MenuItem>

        {items.map(i => (
          <MenuItem key={i.id} value={i.id}>
            <Typography variant='span'>{i.value}</Typography>
          </MenuItem>
        ))}
      </Select>
      {props.error ? <FormHelperText>{props.HelperText}</FormHelperText> : <></>}
    </FormControl>
  );
}
