import { Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Divider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { checkErrors, validateAmount, validateString, validateTransactionCategories } from '../../utils/validations';
import { Btn, SelectDropDown, TextBox } from '../System/Inputs';
import { useSnackbar } from 'notistack';
import useAPICall from '../../hooks/useAPICall';
import useValidations from '../../hooks/useValidations';
import { ApplicationContext } from '../../context/ApplicationContext';
import DateTime from '../System/Inputs/DateTime';
import { formatLocalToUTC } from '../../utils/dates';

export default function TransactionsAddUpdateForm({ data, api, formItems, display, mode, setDisplay, label, ...props }) {
	const { enqueueSnackbar } = useSnackbar();
	const { setValidations } = useValidations();
	const { APIRequest } = useAPICall(true);

	const [modal, setModal] = useState(display);
	const { paymentMethods, transactionCategories, transactionModes, currencyCodes, transactionTypes } = useContext(ApplicationContext);

	const [purpose, bindPurpose, purposeValidations] = useInput('', null, 'Please provide a valid transaction purpose.!', validateString(3, 50));
	const [refNo, bindRefNo, refNoValidations] = useInput('', null, 'Please provide a valid transaction purpose.!', validateString(3, 50));
	const [description, bindDescription, descriptionValidations] = useInput(
		'',
		null,
		'Please provide a valid description for transaction.!',
		validateString(0, 500),
	);

	const [paymentMethod, bindPaymentMethod, paymentMethodValidations] = useInput('', null, 'Please provide a valid payment method type.!');

	const [amount, bindAmount, amountValidations] = useInput('', null, 'Please provide a valid amount.!', validateAmount);

	const [transactionMode, bindTransactionMode, transactionModeValidations] = useInput('', null, 'Please provide a valid payment method type.!');

	const [currencyCode, bindCurrencyCode, currencyCodeValidations] = useInput('INR', null, 'Please provide a valid currency code.!');
	const [transactionDate, bindTransactionDate, transactionDateValidations] = useInput('', 4, 'Please provide a valid transactionDate.!');

	const [transactionCategory, bindTransactionCategory, transactionCategoryValidations] = useInput(
		[],
		null,
		'Please provide a valid transaction category.!',
		validateTransactionCategories,
	);

	const [transactionType, bindTransactionType, transactionTypeValidations] = useInput([], null, 'Please provide a valid transaction type.!');

	const [pmId, bindPMId] = useState(null);

	const disabledStatus = mode === 'VIEW';

	const validationFields = {
		purpose: purposeValidations,
		paymentMethod: paymentMethodValidations,
		description: descriptionValidations,
		mode: transactionModeValidations,
		category: transactionCategoryValidations,
		amount: amountValidations,
		currencyCode: currencyCodeValidations,
		date: transactionDateValidations,
		type: transactionTypeValidations,
		refNumber: refNoValidations,
	};

	const setDefaultData = () => {
		bindPMId(data.id);
		bindPurpose.SetDefaultValue(data.name);
		bindPaymentMethod.SetDefaultValue(data.paymentMethod.id);
	};

	const inputFields = [bindPurpose, bindPaymentMethod];

	useEffect(() => {
		mode && (mode === 'UPDATE' || mode === 'VIEW') && setDefaultData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	const handleModalClose = reload => () => {
		setModal(false);
		setDisplay('')(reload && mode !== 'VIEW');
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
			purpose,
			paymentMethod,
			description,
			mode: transactionMode,
			category: transactionCategory,
			amount,
			currencyCode,
			date: formatLocalToUTC(transactionDate.format()),
			type: transactionType,
			refNumber: refNo,
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
			<Dialog maxWidth='sm' fullWidth open={modal} onClose={handleModalClose(false)} TransitionComponent={Fade}>
				<form
					onSubmit={e => {
						e.preventDefault();
						submitAPI();
					}}
				>
					{mode !== 'BULK_CREATE' ? (
						<>
							<DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Add/Update Transaction</DialogTitle>
							<Divider sx={{ ml: 2, mr: 2 }} />
							<DialogContent
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Grid
									container
									spacing={2}
									sx={{
										p: 0.5,
									}}
								>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextBox
											id='purpose'
											label='Transaction Purpose'
											type='text'
											value={purpose}
											{...bindPurpose}
											required
											disabled={disabledStatus}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextBox
											id='description'
											label='Transaction Description'
											type='textarea'
											value={description}
											{...bindDescription}
											required
											multiline
											disabled={disabledStatus}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
										<SelectDropDown
											id='paymentMethod'
											label={'Payment Method'}
											items={
												transactionMode
													? paymentMethods
															.filter(
																I =>
																	(['CHEQUE', 'IMPS', 'RTGS', 'NEFT', 'UPI', 'WIRE-TRANSFER', 'ONLINE'].includes(
																		transactionMode,
																	)
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

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
										<SelectDropDown
											id='transaction-category'
											label={'Transaction category'}
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

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
										<SelectDropDown
											id='transaction-type'
											label={'Transaction Type'}
											items={transactionTypes.map(I => ({
												id: I,
												value: I,
											}))}
											value={transactionType}
											required
											disabled={disabledStatus}
											readOnly={disabledStatus}
											fullWidth
											{...bindTransactionType}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
										<TextBox
											id='amount'
											label='Amount'
											type='text'
											value={amount}
											{...bindAmount}
											required
											disabled={disabledStatus}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
										<DateTime
											id='transaction-date'
											label='Transaction Date'
											value={transactionDate}
											{...bindTransactionDate}
											required
											disabled={disabledStatus}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
										<TextBox
											id='ref-no'
											label='Transaction Reference'
											type='text'
											value={refNo}
											{...bindRefNo}
											disabled={disabledStatus}
										/>
									</Grid>

									{/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <MultiSelectForm
                      id='transaction-category'
                      label='Transaction Categories'
                      readOnly={disabledStatus}
                      value={transactionCategory}
                      setValue={bindTransactionCategory}
                      fullWidth
                      required
                      disabled={disabledStatus}
                      requireAll={false}
                      denseMenu={false}
                      options={transactionCategories.map(cat => ({ key: cat, id: cat, value: cat, label: cat }))}
                      name='Please choose at-least one transaction category'
                    />
                  </Grid> */}
								</Grid>
							</DialogContent>
							<DialogActions>
								<Btn onClick={handleModalClose(true)}>close</Btn>
								<Btn type='submit' disabled={disabledStatus}>
									{mode}
								</Btn>
							</DialogActions>
						</>
					) : (
						<>
							<DialogTitle
								sx={{
									textAlign: 'center',
									textTransform: 'uppercase',
								}}
							>
								Menu Category Bulk Upload
							</DialogTitle>
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
