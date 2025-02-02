import { Button } from '@mui/material';

export default function Btn({ component, label, icon, disabled, ...props }) {
	return (
		<Button variant={disabled ? 'outlined' : 'contained'} {...props} {...(icon ? { startIcon: <icon /> } : {})} disabled={disabled}>
			{props.children ? props.children : label}
		</Button>
	);
}
