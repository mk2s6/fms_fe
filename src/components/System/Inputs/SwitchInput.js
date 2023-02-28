import { FormControlLabel, FormGroup, Switch } from '@mui/material';

export default function SwitchInput({ ...props }) {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch {...props} />} label={props.label} />
    </FormGroup>
  );
}
