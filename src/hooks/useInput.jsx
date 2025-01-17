import { useState } from 'react';
import { formatDate } from '../commons/dates';

// const TYPES = {
//   1: 'text',
//   2: 'check',
//   3: 'date',
//   4: 'multi-select',
// };

const useInput = (initialValue, type, validationMessage = '', validator = _v => true) => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState('');

	const reset = () => setValue(initialValue);

	const onChange = e => {
		if (!type) setValue(e.target.value);
		else if (type === 2) setValue(e.target.checked);
		else if (type === 3) setValue(formatDate(e));
		else if (type === 4) setValue(e);
		setError(false);
	};

	const onBlur = e => {
		if (!validator(value)) {
			setError(true);
			setHelperText(validationMessage);
		}
	};

	const validate = e => {
		if (!validator(value)) {
			setError(true);
			setHelperText(validationMessage);
		}
	};

	const setValidationErrors = e => {
		console.log(e);
		setError(true);
		setHelperText(e.message);
	};

	const setdefaultvalue = _val => {
		setValue(_val);
	};

	return [
		value,
		{
			value,
			onChange,
			validate,
			setdefaultvalue,
			onBlur,
			error,
			...(error ? { HelperText: helperText } : {}),
			...(type === 2 ? { checked: value } : {}),
		},
		setValidationErrors,
		reset,
	];
};

export default useInput;
