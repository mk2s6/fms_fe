import { IconButton } from '@mui/material';

export default function IconBtn({ component, label, icon, disabled, ...props }) {
	return (
		<IconButton variant='outlined' {...props} disabled={!!disabled}>
			{icon}
		</IconButton>
	);
}
