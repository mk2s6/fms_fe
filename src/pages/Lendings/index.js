/* eslint-disable react-hooks/exhaustive-deps */
import { AddCircleTwoTone, EditTwoTone, VisibilityTwoTone } from '@mui/icons-material';
import { ButtonGroup, Card, CardActions, CardContent, Container, Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Btn } from '../../components/System/Inputs';
import SpeedDialInput from '../../components/System/SpeedDialInput';
import useAPICall from '../../hooks/useAPICall';
import { generateKeysFromObjects } from '../../utils';
import LendingCard from '../../components/Lendings/LendingsCard';
import LendingsAddUpdateForm from '../../components/Lendings/LendingsAddUpdateForm';

export default function Lendings() {
	const [clickType, setClickType] = useState('');
	const [settlementFilter, setSettlementFilter] = useState('');

	const { APIRequest } = useAPICall(false);
	const [activeLendings, setActiveLendings] = useState([]);
	const [updateData, setUpdateData] = useState({});

	const [reload, setReload] = useState(false);

	const getActiveLendings = async () => {
		try {
			const { data } = await APIRequest('GET_ACTIVE_LENDINGS');
			setActiveLendings(data);
		} catch (e) {}
	};

	const setDisplay =
		(to = '') =>
		async reload => {
			setClickType(to);
			reload && setReload(reload);
		};

	const toolTopActions = [
		{
			key: 'CREATE',
			icon: <AddCircleTwoTone />,
			toolTip: 'Add Credit/Lending',
			action: () => {
				setClickType('CREATE');
			},
		},
	];

	const handleUpdateRequest = type => data => () => {
		setClickType(type);
		setUpdateData(data);
	};

	const handleSettlementStatus = type => () => {
		setSettlementFilter(type);
	};

	const lendingActions = [
		{
			key: 'VIEW',
			icon: <VisibilityTwoTone />,
			toolTip: 'View',
			action: handleUpdateRequest('VIEW'),
		},
		{
			key: 'UPDATE',
			icon: <EditTwoTone />,
			toolTip: 'Update',
			action: handleUpdateRequest('UPDATE'),
		},
	];

	const APICalls = {
		CREATE: 'ADD_LENDING',
		UPDATE: 'UPDATE_LENDING',
		VIEW: 'GET_LENDINGS_DETAILS',
	};

	const updateToggle = () => {
		setClickType('UPDATE');
	};

	const SettlementTypes = [
		{
			key: 'UN-SETTLED',
			text: 'UN SETTLED',
			toolTip: 'Not Settled Transactions',
			action: handleSettlementStatus('UN-SETTLED'),
		},
		{
			key: 'SETTLED',
			text: 'SETTLED',
			toolTip: 'Settled Transactions',
			action: handleSettlementStatus('SETTLED'),
		},
	];

	const api = () => APICalls[clickType];

	useEffect(() => {
		(async () => {
			await getActiveLendings();
			setSettlementFilter(SettlementTypes[0].key);
		})();
	}, []);

	useEffect(() => {
		reload &&
			(async () => {
				await getActiveLendings();
				setReload(false);
			})();
	}, [reload]);

	return (
		<>
			<Container maxWidth='xl' sx={{ mt: 1 }} component='main'>
				{activeLendings.length && false && (
					<Grid container justifyContent='center' spacing={2} sx={{ mt: 2 }}>
						<ButtonGroup>
							{SettlementTypes.map(types => {
								const disabled = types.key === settlementFilter;
								return (
									<Btn key={types.key} onClick={types.action} disabled={disabled} sx={disabled ? { color: '#888!important' } : {}}>
										{types.text}
									</Btn>
								);
							})}
						</ButtonGroup>
					</Grid>
				)}

				<Grid container justifyContent='center' spacing={2} sx={{ mt: 0, p: 0.5 }}>
					{activeLendings.length === 0 && (
						<Grid item xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
							<Card sx={{ minHeight: 100 }} color='secondary' variant='elevation' elevation={16}>
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

					{activeLendings.length > 0 &&
						activeLendings.map(pm => {
							return <LendingCard key={generateKeysFromObjects(pm)} actions={lendingActions} data={pm} />;
						})}
				</Grid>

				{!!clickType && (
					<LendingsAddUpdateForm
						_data={updateData}
						api={api()}
						displayAPI={APICalls.VIEW}
						label={'Menu-Category-Add-Update-Form'}
						setDisplay={setDisplay}
						display={!!clickType}
						mode={clickType}
						updateToggle={updateToggle}
					/>
				)}
			</Container>
			<SpeedDialInput actions={toolTopActions} ariaLabel='Add Credit/Lending' />
		</>
	);
}
