import { Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid2 as Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { checkErrors, isValidEmail, validateAmount, validateString, validateTransactionCategories } from '../../utils/validations';
import { Btn, SelectDropDown, TextBox } from '../System/Inputs';
import { useSnackbar } from 'notistack';
import useAPICall from '../../hooks/useAPICall';
import useValidations from '../../hooks/useValidations';
import SwitchInput from '../System/Inputs/SwitchInput';
import { EditTwoTone } from '@mui/icons-material';
import { ApplicationContext } from '../../context/ApplicationContext';
import DateTime from '../System/Inputs/DateTime';
import { formatLocalToUTC, formatUTCToLocal } from '../../utils/dates';
import moment from 'moment';

export default function LendingsAddUpdateForm({ _data, displayAPI, api, formItems, display, mode, setDisplay, label, updateToggle, ...props }) {
	const { enqueueSnackbar } = useSnackbar();
	const { setValidations } = useValidations();
	const { APIRequest } = useAPICall(true);
	const { transactionCategories, currencyCodes, transactionModes, paymentMethods, refreshData } = useContext(ApplicationContext);

	const [purpose, bindPurpose, purposeValidations] = useInput(
		'',
		null,
		'Please provide a valid category of 3 to 50 characters.!',
		validateString(3, 50),
	);
	const [details, bindDetails, detailsValidations] = useInput(
		'',
		null,
		'Please provide a valid category of 3 to 50 characters.!',
		validateString(3, 50),
	);
	const [toName, bindToName, toNameValidations] = useInput('', null, 'Please provide a valid name to proceed!', validateString(3, 50));
	const [toPhone, bindToPhone, toPhoneValidations] = useInput('', null, 'Please provide a valid phone number!', validateString(10, 15));
	const [toEmail, bindToEmail, toEmailValidations] = useInput('', null, 'Please provide a valid email.!', isValidEmail);

	const [transactionMode, bindTransactionMode, transactionModeValidations] = useInput('', null, 'Please provide a valid transaction mode.!');
	const [amount, bindAmount, amountValidations] = useInput('', null, 'Please provide a valid amount.!', validateAmount);
	const [currencyCode, bindCurrencyCode, currencyCodeValidations] = useInput('INR', null, 'Please provide a valid currency code.!');

	const [transactionCategory, bindTransactionCategory, transactionCategoryValidations] = useInput(
		[],
		null,
		'Please provide a valid transaction category.!',
		validateTransactionCategories,
	);

	const [paymentMethod, bindPaymentMethod, paymentMethodValidations] = useInput('', null, 'Please provide a valid payment method.!');

	const [borrowingStatus, bindBorrowingStatus, borrowingStatusValidations] = useInput(false, 2);
	const [settlementStatus, bindSettlementStatus] = useInput(false, 2);
	const [transactionDate, bindTransactionDate, transactionDateValidations] = useInput(moment(), 4, 'Please provide a valid transactionDate.!');

	const [lendingId, bindLendingId] = useState(null);

	const disabledStatus = mode === 'VIEW';

	const validationFields = {
		purpose: purposeValidations,
		details: detailsValidations,
		isBorrowed: borrowingStatusValidations,
		category: transactionCategoryValidations,
		amount: amountValidations,
		currencyCode: currencyCodeValidations,
		onDate: transactionDateValidations,
		mode: transactionModeValidations,
		toPhone: toPhoneValidations,
		toEmail: toEmailValidations,
		paymentMethod: paymentMethodValidations,
		toName: toNameValidations,
	};

	const setDefaultData = data => {
		bindLendingId(data.id);
		bindPurpose.setdefaultvalue(data.purpose);
		bindDetails.setdefaultvalue(data.details);
		bindToEmail.setdefaultvalue(data.toEmail);
		bindToPhone.setdefaultvalue(data.toPhone);
		bindToName.setdefaultvalue(data.toName);
		bindTransactionCategory.setdefaultvalue(data.category);
		bindTransactionMode.setdefaultvalue(data.mode);
		bindCurrencyCode.setdefaultvalue(data.currencyCode);
		bindAmount.setdefaultvalue(data.amount);
		bindBorrowingStatus.setdefaultvalue(data.borrowingStatus);
		bindBorrowingStatus.setdefaultvalue(data.borrowingStatus);
		bindTransactionDate.setdefaultvalue(formatUTCToLocal(data.onDate));
		bindSettlementStatus.setdefaultvalue(data.settlementStatus);
		bindPaymentMethod.setdefaultvalue(data.paymentMethod);
	};

	const inputFields = [
		bindPurpose,
		bindDetails,
		bindAmount,
		bindCurrencyCode,
		bindToEmail,
		bindToName,
		bindToPhone,
		bindTransactionCategory,
		bindTransactionDate,
		bindTransactionMode,
		bindBorrowingStatus,
		bindPaymentMethod,
	];

	const getDetails = async () => {
		if (displayAPI) {
			const {
				data: [__],
			} = await APIRequest(displayAPI, { id: _data.id });
			setDefaultData(__);
			console.log(__);
		} else {
			setDefaultData(_data);
		}
	};

	useEffect(() => {
		refreshData();
		(async () => (mode === 'UPDATE' || mode === 'VIEW') && (await getDetails()))();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleModalClose = reload => () => {
		setDisplay('')(reload && mode !== 'VIEW');
	};

	const handleUpdateToggle = () => {
		!disabledStatus && updateToggle();
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
			id: mode === 'UPDATE' ? lendingId : null,
			purpose,
			details,
			toName,
			toEmail,
			toPhone,
			category: transactionCategory,
			onDate: formatLocalToUTC(transactionDate.format()),
			mode: transactionMode,
			currencyCode,
			amount,
			isBorrowed: borrowingStatus,
			paymentMethod,
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

	return (
		<>
			<Dialog maxWidth='sm' fullWidth open={display} onClose={handleModalClose(false)} TransitionComponent={Fade} sx={{ p: 0, m: 0 }}>
				<form
					onSubmit={e => {
						e.preventDefault();
						submitAPI();
					}}
				>
					{mode !== 'BULK_CREATE' ? (
						<>
							<DialogTitle sx={{ textAlign: 'center', fontSize: 16, p: 1, pb: 0 }} component={Typography} variant='button'>
								{borrowingStatus ? 'Borrowing Details' : 'Loaning Details'}
							</DialogTitle>
							<DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
								<Grid container spacing={2} sx={{ pt: 1 }} columns={2}>
									<Grid size={2}>
										<TextBox id='purpose' label='Purpose' type='text' value={purpose} {...bindPurpose} required disabled={disabledStatus} />
									</Grid>
									<Grid size={2}>
										<TextBox id='details' label='Details' type='text' value={details} {...bindDetails} required disabled={disabledStatus} />
									</Grid>

									<Grid size={1}>
										<TextBox
											id='name'
											label={borrowingStatus ? 'Borrowing from' : 'Loaned to'}
											type='text'
											value={toName}
											{...bindToName}
											required
											disabled={disabledStatus}
										/>
									</Grid>

									<Grid size={1}>
										<SelectDropDown
											id='Borrowing-category'
											label={`${borrowingStatus ? 'Borrowing for' : 'Loaned to'} category`}
											items={transactionCategories.map(I => ({
												id: I,
												value: I,
											}))}
											value={transactionCategory}
											required
											disabled={disabledStatus}
											readOnly={disabledStatus}
											fullWidth
											{...bindTransactionCategory}
										/>
									</Grid>

									<Grid size={1}>
										<TextBox
											id='toEmail'
											label={`${borrowingStatus ? 'Borrowing from' : 'Loaned to'} Email`}
											type='text'
											value={toEmail}
											{...bindToEmail}
											required
											disabled={disabledStatus}
										/>
									</Grid>
									<Grid size={1}>
										<TextBox
											id='toPhone'
											label={`${borrowingStatus ? 'Borrowing from' : 'Loaned to'} Phone`}
											type='text'
											value={toPhone}
											{...bindToPhone}
											required
											disabled={disabledStatus}
										/>
									</Grid>

									<Grid size={1}>
										<SelectDropDown
											id='transaction-currency-code'
											label={'Currency Code'}
											items={currencyCodes.map(I => ({
												value: `${I.currency}-${I.country}`,
												id: I.currency,
											}))}
											value={currencyCode}
											required
											disabled={disabledStatus}
											readOnly={disabledStatus}
											fullWidth
											{...bindCurrencyCode}
										/>
									</Grid>

									<Grid size={1}>
										<TextBox id='amount' label='Amount' type='text' value={amount} {...bindAmount} required disabled={disabledStatus} />
									</Grid>

									<Grid size={1}>
										<SelectDropDown
											id='transaction-mode'
											label={'Transaction Mode'}
											items={transactionModes.map(I => ({
												id: I,
												value: I,
											}))}
											value={transactionMode}
											required
											disabled={disabledStatus}
											readOnly={disabledStatus}
											fullWidth
											{...bindTransactionMode}
										/>
									</Grid>

									<Grid size={1}>
										<SelectDropDown
											id='paymentMethod'
											label={'Payment Method'}
											items={
												transactionMode
													? paymentMethods
															.filter(
																I =>
																	(['CHEQUE', 'IMPS', 'RTGS', 'NEFT', 'UPI', 'WIRE-TRANSFER', 'ONLINE'].includes(transactionMode)
																		? I.type === 'BANK ACCOUNT'
																		: false) || I.type === transactionMode,
															)
															.map(I => ({
																...I,
																value: `${I.name} - ${'x'.repeat(2)}${I.last4Digits}`,
															}))
													: []
											}
											value={paymentMethod}
											disabled={!transactionMode || disabledStatus}
											fullWidth
											{...bindPaymentMethod}
											addNew={true}
											addNewApi={'/payment-methods'}
										/>
									</Grid>

									<Grid size={1}>
										<DateTime
											id='transaction-date'
											label='Transaction Date'
											value={transactionDate}
											{...bindTransactionDate}
											required
											disabled={disabledStatus}
										/>
									</Grid>
								</Grid>
							</DialogContent>
							<DialogActions>
								<Grid size={1} alignItems='center' justifyContent='center'>
									<SwitchInput
										id='setActive'
										sx={{ mr: 2 }}
										label={borrowingStatus ? 'Is Being Borrowed.!!' : 'Is Being Loaned.!!'}
										labelPlacement='start'
										{...bindBorrowingStatus}
										disabled={disabledStatus}
										onChange={async e => {
											bindBorrowingStatus.onChange(e);
										}}
									/>
								</Grid>
								<Btn onClick={handleModalClose(false)}>close</Btn>
								<Btn id={'payment-method-submit'} sx={{ display: mode === 'VIEW' ? 'none' : 'initial' }} type='submit' disabled={disabledStatus}>
									{mode}
								</Btn>
								{mode === 'VIEW' && (
									<Btn id={'handle-update-toggle'} onClick={handleUpdateToggle} disabled={mode === 'VIEW' || settlementStatus}>
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
