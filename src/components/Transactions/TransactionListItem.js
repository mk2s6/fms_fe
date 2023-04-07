import { Avatar, Grid, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
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
					width: { xs: '100%', sm: '100%', md: '85%', xl: '85%', lg: '85%' },
				}}
				onClick={() => {
					toggleDetails();
				}}
			>
				<ListItemAvatar alignItems='flex-start'>
					<Avatar>
						<ReceiptLongIcon />
					</Avatar>
				</ListItemAvatar>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} md={5}>
						<ListItemText
							primary={data.purpose}
							primaryTypographyProps={{ variant: 'button', sx: { fontSize: '16px' } }}
							secondary={formatDisplayDate(data.date)}
							secondaryTypographyProps={{ variant: 'caption' }}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={4}
						md={3}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							pr: 4,
						}}
					>
						<Typography variant='body'>{data.mode}</Typography>
					</Grid>

					<Grid item xs={6} sm={4} md={2} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
						<Typography variant='body2'>{data.category}</Typography>
					</Grid>

					<Grid item xs={6} sm={4} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, m: 0 }}>
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
