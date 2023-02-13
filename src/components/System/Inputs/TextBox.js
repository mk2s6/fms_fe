import { TextField } from '@mui/material';

export default function TextBox(props) {
  const inputName = () => `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  return <TextField variant='outlined' type='text' fullWidth name={inputName()} autoComplete={'off'} {...props} />;
}
