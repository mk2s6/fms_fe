import { FormControl } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export default function DateTime({ component, ...props }) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<FormControl required fullWidth {...props}>
				<MobileDateTimePicker
					ampm={false}
					variant='contained'
					fullWidth
					format='LLL'
					{...props}
					// value={props.value ? props.value : currentDateTime()}
				/>
			</FormControl>
		</LocalizationProvider>
	);
}
