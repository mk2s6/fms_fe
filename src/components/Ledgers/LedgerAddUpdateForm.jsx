import { Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid2 as Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { checkErrors, validateMultiSelectValues, validateString } from '../../utils/validations';
import { Btn, TextBox } from '../System/Inputs';
import { useSnackbar } from 'notistack';
import useAPICall from '../../hooks/useAPICall';
import useValidations from '../../hooks/useValidations';
import { Category, EditTwoTone } from '@mui/icons-material';
import { ApplicationContext } from '../../context/ApplicationContext';
import MultiSelectForm from '../System/Inputs/MultiSelectForm';

export default function LedgerAddUpdateForm({ payload, open, onClose }) {
	const { enqueueSnackbar } = useSnackbar();
	const { setValidations } = useValidations();
	const { APIRequest } = useAPICall(true);
	const { transactionCategories } = useContext(ApplicationContext);
	const { data, api } = payload;
	console.log('transactionCategories :- ', data);
	const [name, bindName, nameValidations] = useInput('', null, 'Please provide a valid ledger name of 3 to 50 characters.!', validateString(3, 50));
	const [purpose, bindPurpose, purposeValidations] = useInput(
		'',
		null,
		'Please provide a valid purpose of 3 to 50 characters.!',
		validateString(3, 50),
	);
	const [details, bindDetails, detailsValidations] = useInput(
		'',
		null,
		'Please provide a valid details of 3 to 50 characters.!',
		validateString(3, 50),
	);
	const [categories, bindCategories, categoriesValidations] = useInput(
		[],
		4,
		'Please choose one or more categories for categories!',
		validateMultiSelectValues(),
	);

	const validationFields = {
		name: nameValidations,
		purpose: purposeValidations,
		details: detailsValidations,
		category: categoriesValidations,
	};

	const setDefaultData = data => {
		bindName.setdefaultvalue(data.name);
		bindPurpose.setdefaultvalue(data.purpose);
		bindDetails.setdefaultvalue(data.details);
		bindCategories.setdefaultvalue(data.category?.map(cat => ({ key: cat, label: cat })) || []);
	};

	useEffect(() => {
		if (data) {
			setDefaultData(data);
		}
	}, [data]);

	const inputFields = [bindPurpose, bindDetails, bindName, bindCategories];

	const submitAPI = async () => {
		if (checkErrors(inputFields)) {
			enqueueSnackbar('Please Fix validation errors to proceed.!', {
				variant: 'warning',
			});
			return;
		}

		try {
			const reqData = { id: data.id || null, name, purpose, details, categories };
			await APIRequest(api, reqData);
			onClose({ reload: true });
		} catch (e) {
			console.log(e, e.type);
			if (e.type === 0 && e.errors.length) {
				setValidations(validationFields, e.errors);
			}
		}
	};

	return (
		<>
			<Dialog maxWidth='sm' fullWidth open={open} onClose={() => onClose()} TransitionComponent={Fade} sx={{ p: 2, m: 0 }}>
				<form
					onSubmit={e => {
						e.preventDefault();
						submitAPI();
					}}
				>
					<DialogTitle sx={{ textAlign: 'center', fontSize: 16, p: 2, pb: 0 }} component={Typography} variant='button'>
						Ledgers
					</DialogTitle>
					<DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
						<Grid container spacing={2} sx={{ pt: 1 }} columns={2}>
							<Grid size={2}>
								<TextBox id='name' label='name' type='text' value={name} {...bindName} required />
							</Grid>{' '}
							<Grid size={2}>
								<TextBox id='purpose' label='Purpose' type='text' value={purpose} {...bindPurpose} required />
							</Grid>
							<Grid size={2}>
								<TextBox id='details' label='Details' type='text' value={details} {...bindDetails} required />
							</Grid>
							<Grid size={2}>
								<MultiSelectForm
									id='ledgercategories'
									label='Categories'
									value={categories}
									setValue={bindCategories}
									sortValues={true}
									sortLabel={'key'}
									fullWidth
									required
									requireAll={true}
									denseMenu={false}
									options={transactionCategories.map(category => ({ key: category, label: category }))}
									name='Please choose at-least one week day or all'
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Btn onClick={() => onClose({ reload: false })}>close</Btn>
						<Btn id='payment-method-submit' type='submit'>
							{!!data.id ? 'Update' : 'Add'}
						</Btn>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
}
