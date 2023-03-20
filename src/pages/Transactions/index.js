import { AddCircleTwoTone, DownloadForOfflineTwoTone, UploadFileTwoTone } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useState } from 'react';
import SpeedDialInput from '../../components/System/SpeedDialInput';
import Transition from '../../components/System/Transition';
import TransactionsList from '../../components/Transactions/TransactionList';
import TransactionsAddUpdateForm from '../../components/Transactions/TransactionsAddUpdateForm';

function Transactions() {
	const [clickType, setClickType] = useState('');
	const [reload, setReload] = useState(false);

	const setDisplay =
		(to = '') =>
		async reload => {
			setClickType(to);
			reload && setReload(reload);
		};

	const toolTopActions = [
		{
			key: 'Add',
			icon: <AddCircleTwoTone />,
			toolTip: 'Add Transactions',
			action: () => {
				setClickType('CREATE');
			},
		},
		{
			key: 'bulk-upload',
			icon: <UploadFileTwoTone />,
			toolTip: 'Bulk add transactions',
			action: () => {
				// setClickType('BULK_CREATE');
				alert('This feature is coming soon..!!');
			},
		},
		{
			key: 'bulk-create-sample',
			icon: <DownloadForOfflineTwoTone />,
			toolTip: 'Bulk Create - sample',
			action: () => {
				alert('This feature is coming soon..!!');
			},
		},
	];

	return (
		<>
			<Transition>
				<Container maxWidth='lg' sx={{ mt: 1, p: 2 }}>
					{!!clickType && (
						<TransactionsAddUpdateForm api={'CREATE_TRANSACTION'} mode={clickType} display={!!clickType} setDisplay={setDisplay} />
					)}
					<TransactionsList reload={reload} setReload={setReload} API={'GET_TRANSACTIONS_LIST'} />
				</Container>
			</Transition>
			<SpeedDialInput actions={toolTopActions} ariaLabel='Create Options - Add a Transaction' />
		</>
	);
}

export default Transactions;
