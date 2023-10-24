import { Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { checkErrors, PAYMENT_METHOD_TYPES, validatePaymentMethodTypes, validateString } from '../../utils/validations';
import { Btn, SelectDropDown, TextBox } from '../System/Inputs';
import { useSnackbar } from 'notistack';
import useAPICall from '../../hooks/useAPICall';
import useValidations from '../../hooks/useValidations';
import SwitchInput from '../System/Inputs/SwitchInput';
import { EditTwoTone } from '@mui/icons-material';

export default function PaymentMethodAddUpdateForm({ data, api, formItems, display, mode, setDisplay, label, updateToggle, ...props }) {
	const { enqueueSnackbar } = useSnackbar();
	const { setValidations } = useValidations();
	const { APIRequest } = useAPICall(true);

	const [modal, setModal] = useState(display);

	const [name, bindName, nameValidations] = useInput('', null, 'Please provide a valid category of 3 to 50 characters.!', validateString(3, 50));
	const [type, bindType, typeValidations] = useInput('', null, 'Please provide a valid payment method type.!', validatePaymentMethodTypes);
	const [last4Digits, bindLast4Digits, last4DigitsValidations] = useInput(
		'',
		null,
		'Please provide a valid last 4 characters for the payment method.!',
		validateString(4, 4),
	);

	const [active, bindActive, activeValidations] = useInput('', 2);

	const [pmId, bindPMId] = useState(null);
	const [updateStatus, setUpdateStatus] = useState(false);

	const disabledStatus = mode === 'VIEW';

	const validationFields = {
		name: nameValidations,
		type: typeValidations,
		last4Digit: last4DigitsValidations,
		active: activeValidations,
	};

	const setDefaultData = () => {
		bindPMId(data.id);
		bindName.setdefaultvalue(data.name);
		bindType.setdefaultvalue(data.type);
		bindLast4Digits.setdefaultvalue(data.last4Digits);
		bindActive.setdefaultvalue(data.active);
	};

	const inputFields = [bindName, bindType, bindLast4Digits];

	useEffect(() => {
		mode && (mode === 'UPDATE' || mode === 'VIEW') && setDefaultData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	const handleModalClose = reload => () => {
		setModal(false);
		setDisplay('')(reload && mode !== 'VIEW');
	};

	const handleUpdateToggle = () => {
		updateToggle();
	};

	const submitAPI = async () => {
		if (checkErrors(inputFields)) {
			enqueueSnackbar('Please Fix validation errors to proceed.!', {
				variant: 'warning',
			});
			return;
		}

		if (mode === 'VIEW') return;

		const reqData = {
			id: mode === 'UPDATE' ? pmId : null,
			name,
			type,
			last4Digits,
		};
		try {
			await APIRequest(api, reqData);
			await handleModalClose(true)();
		} catch (e) {
			if (e.type === 0 && e.errors.length) {
				setValidations(validationFields, e.errors);
			}
		}
	};

	const toggleStatusChange = async () => {
		if (checkErrors([bindActive])) {
			enqueueSnackbar('Please Fix validation errors to proceed.!', {
				variant: 'warning',
			});
			return;
		}

		if (mode === 'VIEW') return;

		const reqData = {
			id: mode === 'UPDATE' ? pmId : null,
			active,
		};
		try {
			await APIRequest('TOGGLE_PAYMENT_METHOD_STATUS', reqData);
		} catch (e) {
			if (e.type === 0 && e.errors.length) {
				setValidations(validationFields, e.errors);
			}
		}
	};

	useEffect(() => {
		if (updateStatus && mode === 'UPDATE') {
			(async () => {
				await toggleStatusChange();
				setUpdateStatus(false);
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateStatus, active]);

	return (
		<>
			<Dialog maxWidth='sm' fullWidth open={modal} onClose={handleModalClose(false)} TransitionComponent={Fade}>
				<form
					onSubmit={e => {
						e.preventDefault();
						submitAPI();
					}}
				>
					{mode !== 'BULK_CREATE' ? (
						<>
							<DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Payment Method - {mode}</DialogTitle>
							<Divider sx={{ ml: 2, mr: 2 }} />
							<DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<Grid container spacing={2} sx={{ p: 0.5 }}>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextBox id='name' label='Payment Method Name' type='text' value={name} {...bindName} required disabled={disabledStatus} />
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<SelectDropDown
											id='type'
											label={'Payment Method Type'}
											items={PAYMENT_METHOD_TYPES.map(I => ({ id: I, value: I }))}
											value={type}
											required
											disabled={disabledStatus}
											readOnly={disabledStatus}
											fullWidth
											{...bindType}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextBox
											id='last4Digits'
											label='Payment Method last 4 Digits'
											type='text'
											value={last4Digits}
											{...bindLast4Digits}
											required
											disabled={disabledStatus}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems='center' justifyContent='center'>
										<SwitchInput
											id='setActive'
											label={active ? 'Active Payment Method' : 'In-Active Payment Method'}
											{...bindActive}
											disabled={disabledStatus}
											onChange={async e => {
												bindActive.onChange(e);
												setUpdateStatus(true);
											}}
										/>
									</Grid>
								</Grid>
							</DialogContent>
							<DialogActions>
								<Btn onClick={handleModalClose(true)}>close</Btn>
								<Btn id={'payment-method-submit'} sx={{ display: mode === 'VIEW' ? 'none' : 'initial' }} type='submit' disabled={disabledStatus}>
									{mode}
								</Btn>
								{mode === 'VIEW' && (
									<Btn id={'handle-update-toggle'} onClick={handleUpdateToggle} disabled={!disabledStatus}>
										<EditTwoTone />
									</Btn>
								)}
							</DialogActions>
						</>
					) : (
						<>
							<DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Menu Category Bulk Upload</DialogTitle>
							<DialogContent>
								<DialogContentText>
									To bulk upload categories please download the template and update values in the template file and upload here.
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Btn onClick={handleModalClose(false)}>close</Btn>
								<Btn>Upload</Btn>
							</DialogActions>
						</>
					)}
				</form>
			</Dialog>
		</>
	);
}
