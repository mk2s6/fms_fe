import { FormControl, FormHelperText, TextField } from '@mui/material';
import { inputName } from '../../../utils';

export default function TextBox(props) {
  return (
    <FormControl required fullWidth {...props}>
      <TextField variant='outlined' type='text' fullWidth name={inputName()} autoComplete={'off'} {...props} />
      {props.error ? <FormHelperText>{props.HelperText}</FormHelperText> : <></>}
    </FormControl>
  );
}
