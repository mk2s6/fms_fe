import { Avatar, Grid2 as Grid, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import { formatDisplayDate } from '../../commons/dates';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import { getCurrencyForListFormat } from '../../utils';

const Amount = styled(Typography)(({ theme, type }) => {
	if (['CREDIT', 'CASHBACK', 'REFUND'].includes(type)) {
		return {
			color: theme.palette.success.main,
		};
	} else if (['DEBIT', 'CHARGES'].includes(type)) {
		return {
			color: theme.palette.error.main,
		};
	} else if (['IN-VALID'].includes(type)) {
		return {
			color: theme.palette.warning.main,
			textDecoration: 'line-through',
		};
	} else {
		return {};
	}
});

export default function TransactionListItem({ data }) {
	const [openDetails, setOpenDetails] = useState(false);

	const toggleDetails = () => {
		setOpenDetails(!openDetails);
	};

	return (
		<>
			<TransactionDetails id={data.id} open={openDetails} toggle={toggleDetails} />

			<ListItemButton
				sx={{
					width: { xs: '100%', sm: '100%', md: '95%', xl: '95%', lg: '95%' },
				}}
				onClick={() => {
					toggleDetails();
				}}
			>
				<Grid container spacing={1} sx={{ flexGrow: 1 }} justifyContent='space-between' columns={12}>
					<Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
						<ListItemText primary={data.purpose} secondary={formatDisplayDate(data.date)} />
					</Grid>

					<Grid
						size={{ xs: 4, sm: 4, md: 2, lg: 3 }}
						sx={{
							display: 'flex',
							alignItems: 'center',
							pr: 4,
						}}
					>
						<Typography variant='body2'>{data.mode}</Typography>
					</Grid>

					<Grid size={{ xs: 4, sm: 4, md: 2, lg: 3 }} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
						<Typography variant='body2'>{data.category}</Typography>
					</Grid>

					<Grid size={{ xs: 4, sm: 4, md: 2, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, m: 0 }}>
						<Typography>
							<Amount variant='button' type={data.type}>
								{getCurrencyForListFormat(data.value, data.type, data.currencyCode)}
							</Amount>
						</Typography>
					</Grid>
				</Grid>
			</ListItemButton>
		</>
	);
}
