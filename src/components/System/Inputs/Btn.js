import { Button } from '@mui/material';

export default function Btn({ component, label, icon, ...props }) {
  return (
    <Button variant="contained" {...props}>
      {icon ? icon : ''}
      {props.children ? props.children : label}
    </Button>
  );
}
