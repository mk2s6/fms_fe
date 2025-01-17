import { Button } from '@mui/material';

export default function Btn({ component, label, icon, disabled, ...props }) {
	return (
		<Button variant='contained' {...props} disabled={!!disabled} {...(icon ? { startIcon: <icon {...(disabled ? { color: 'red' } : {})} /> } : {})}>
			{props.children ? props.children : label}
		</Button>
	);
}
