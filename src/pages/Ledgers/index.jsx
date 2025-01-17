/* eslint-disable react-hooks/exhaustive-deps */
import { AddCircleTwoTone, CurrencyExchangeTwoTone, DeleteForeverTwoTone, EditTwoTone, VisibilityTwoTone } from '@mui/icons-material';
import { ButtonGroup, Card, CardActions, CardContent, Container, Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Btn } from '../../components/System/Inputs';
import SpeedDialInput from '../../components/System/SpeedDialInput';
import useAPICall from '../../hooks/useAPICall';
import { generateKeysFromObjects } from '../../utils';
import LedgerCard from '../../components/Ledgers/LedgerCard';
import LedgerAddUpdateForm from '../../components/Ledgers/LedgerAddUpdateForm';
import { useDialogs } from '@toolpad/core';

const APICalls = {
	CREATE: 'ADD_LEDGER',
	UPDATE: 'UPDATE_LEDGER',
	VIEW: 'GET_LEDGER_DETAILS',
};

export default function Ledgers() {
	const dialog = useDialogs();
	const { APIRequest } = useAPICall(false);
	const [activeLedgers, setActiveLedgers] = useState([]);

	const [reload, setReload] = useState(false);

	const getActiveLedgers = async () => {
		try {
			const { data } = await APIRequest('GET_LEDGERS_LIST');
			setActiveLedgers(data);
		} catch (e) {
			console.log(e);
		}
	};

	const deleteLedger = ledger => async () => {
		try {
			await APIRequest('DELETE_LEDGER', { id: ledger.id });
			setReload(true);
		} catch (e) {
			console.log(e);
		}
	};

	const handleAddUpdate = type => data => async () => {
		const ledger = await dialog.open(LedgerAddUpdateForm, { data, api: APICalls[type] });
		console.log('Here :-', ledger);
	};

	const toolTopActions = [
		{
			key: 'CREATE',
			icon: <AddCircleTwoTone />,
			toolTip: 'Create A ledger',
			action: handleAddUpdate('CREATE')({ name: '', purpose: '', details: '' }),
		},
	];

	const lendingActions = [
		{
			key: 'DELETE',
			icon: <DeleteForeverTwoTone />,
			toolTip: 'Delete',
			action: deleteLedger,
			props: { disabled: false },
		},
		{
			key: 'UPDATE',
			icon: <EditTwoTone />,
			toolTip: 'Update',
			action: handleAddUpdate('UPDATE'),
		},
	];

	useEffect(() => {
		(async () => {
			await getActiveLedgers();
		})();
	}, []);

	useEffect(() => {
		reload &&
			(async () => {
				await getActiveLedgers();
				setReload(false);
			})();
	}, [reload]);

	return (
		<>
			<Container maxWidth='xl' component='main'>
				<Grid container justifyContent='center' spacing={2} sx={{ p: 0.5 }} columns={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4 }}>
					{activeLedgers.length === 0 && (
						<Grid item xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
							<Card sx={{ minHeight: 100 }} variant='elevation' elevation={16}>
								<CardContent>
									<Typography variant='button' color='text.primary'>
										Ledgers - Add
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

					{activeLedgers.length > 0 &&
						activeLedgers.map(pm => {
							return <LedgerCard key={generateKeysFromObjects(pm)} actions={lendingActions} data={pm} />;
						})}
				</Grid>
			</Container>
			<SpeedDialInput actions={toolTopActions} ariaLabel='ledger-actions' />
		</>
	);
}
