import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import moment from 'moment';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export default function DateTime({ component, value, ...props }) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<FormControl required fullWidth {...props}>
				<MobileDateTimePicker
					ampm={false}
					variant='contained'
					fullWidth
					format='LLL'
					value={value ? value : moment()}
					{...props}
					aria-describedby='my-helper-text'
				/>
				{props.error ? <FormHelperText id='my-helper-text'>{props.HelperText}</FormHelperText> : <></>}
			</FormControl>
		</LocalizationProvider>
	);
}
