/* eslint-disable react-hooks/exhaustive-deps */
import { AddCircleTwoTone, Delete, EditTwoTone, VisibilityTwoTone } from '@mui/icons-material';
import { Card, CardActions, CardContent, Container, Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PaymentMethodAddUpdateForm from '../../components/PaymentMethods/PaymentMethodAddUpdateForm';
import PaymentMethodCard from '../../components/PaymentMethods/PaymentMethodCard';
import { Btn } from '../../components/System/Inputs';
import SpeedDialInput from '../../components/System/SpeedDialInput';
import useAPICall from '../../hooks/useAPICall';
import { generateKeysFromObjects } from '../../utils';

export default function PaymentMethods() {
	const [clickType, setClickType] = useState('');

	const { APIRequest } = useAPICall(false);
	const [paymentMethods, setPaymentMethods] = useState();
	const [updateData, setUpdateData] = useState(null);

	const getPaymentMethods = async () => {
		try {
			const { data } = await APIRequest('GET_PAYMENT_METHODS_LIST');
			setPaymentMethods(data);
		} catch (e) {}
	};

	const setDisplay =
		(to = '') =>
		async reload => {
			try {
				setClickType(to);
				reload && (await getPaymentMethods());
			} catch (e) {
				console.log(e);
			}
		};

	useEffect(() => {
		(async () => {
			try {
				await getPaymentMethods();
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	const toolTopActions = [
		{
			key: 'CREATE',
			icon: <AddCircleTwoTone />,
			toolTip: 'Add Payment Method',
			action: () => {
				setClickType('CREATE');
			},
		},
	];

	const handleUpdateRequest = type => data => () => {
		setClickType(type);
		setUpdateData(data);
	};

	const deletePaymentMethod = data => async () => {
		await APIRequest('DELETE_PAYMENT_METHOD', data);
		await getPaymentMethods();
	};

	const paymentMethodActions = [
		{
			key: 'VIEW',
			icon: <VisibilityTwoTone />,
			toolTip: 'View',
			btn: false,
			action: handleUpdateRequest('VIEW'),
		},
		{
			key: 'UPDATE',
			icon: <EditTwoTone />,
			toolTip: 'Update',
			btn: true,
			action: handleUpdateRequest('UPDATE'),
		},
		{
			key: 'DELETE',
			icon: <Delete />,
			toolTip: 'Delete',
			btn: true,
			action: deletePaymentMethod,
		},
	];

	const APICalls = {
		CREATE: 'ADD_PAYMENT_METHOD',
		UPDATE: 'UPDATE_PAYMENT_METHOD',
		VIEW: '',
	};

	const updateToggle = () => {
		setClickType('UPDATE');
	};

	const api = () => APICalls[clickType];

	return (
		<>
			{paymentMethods && (
				<>
					<Container maxWidth='xl' sx={{ mt: 0 }} component='main'>
						<Grid container justifyContent='center' spacing={2} sx={{ p: 1, flexGrow: 1 }} columns={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4 }}>
							{paymentMethods && paymentMethods.length === 0 && (
								<Grid size={1} variant='button' underline='none'>
									<Card sx={{ minHeight: 100 }} variant='elevation' elevation={16}>
										<CardContent>
											<Typography variant='button' color='text.primary'>
												Payment Method - Add
											</Typography>
										</CardContent>
										<CardActions sx={{ justifyContent: 'center' }}>
											{toolTopActions.map(action => (
												<Btn key={action.key} type='small' onClick={action.action}>
													<Tooltip title={action.toolTip}>{action.icon}</Tooltip>
												</Btn>
											))}
										</CardActions>
									</Card>
								</Grid>
							)}

							{paymentMethods.length > 0 &&
								paymentMethods.map(pm => {
									return <PaymentMethodCard key={generateKeysFromObjects(pm)} actions={paymentMethodActions} data={pm} />;
								})}
						</Grid>

						{!!clickType && (
							<PaymentMethodAddUpdateForm
								data={updateData}
								api={api()}
								label={'Payment-Method-Add-Update-Form'}
								setDisplay={setDisplay}
								display={!!clickType}
								mode={clickType}
								updateToggle={updateToggle}
							/>
						)}
					</Container>
					<SpeedDialInput actions={toolTopActions} ariaLabel='Create Payment Method' />
				</>
			)}
		</>
	);
}
