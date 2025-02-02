import {
	AccountBalanceTwoTone,
	CheckCircleTwoTone,
	CreditCardTwoTone,
	DeleteForeverTwoTone,
	LocalGroceryStoreSharp,
	PaymentTwoTone,
	RemoveCircleTwoTone,
	WalletTwoTone,
} from '@mui/icons-material';
import { CardActions, CardContent, CardHeader, Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import CustomCard from '../System/Cards/CustomCard';
import { Btn } from '../System/Inputs';

const TYPE_ICONS = {
	'CREDIT CARD': <CreditCardTwoTone sx={{ fontSize: '26px' }} />,
	'DEBIT CARD': <CreditCardTwoTone sx={{ fontSize: '26px' }} />,
	'BANK ACCOUNT': <AccountBalanceTwoTone sx={{ fontSize: '26px' }} />,
	WALLET: <WalletTwoTone sx={{ fontSize: '26px' }} />,
	'GROCERY CARD': <LocalGroceryStoreSharp sx={{ fontSize: '26px' }} />,
	'FOOD CARD': <PaymentTwoTone sx={{ fontSize: '26px' }} />,
};

export default function PaymentMethodCard({ data, actions, ...props }) {
	const [paymentMethod] = useState(data || {});

	function display() {
		return actions.filter(_ => _.key === 'VIEW')[0].action(data);
	}
	return (
		<Grid size={1} key={paymentMethod.id} variant='button' underline='none'>
			<CustomCard sx={{ minHeight: 80, p: 1, pl: 2, pt: 2 }}>
				<CardContent sx={{ p: 0, width: '100%' }} onClick={display()}>
					<CardHeader
						sx={{ p: 0 }}
						title={paymentMethod.name}
						titleTypographyProps={{ variant: 'h6', sx: { fontSize: '20px', mb: 0, pb: 0 }, gutterBottom: false, color: 'text.primary' }}
						subheader={`${'X'.repeat(4)}${paymentMethod.last4Digits}`}
						subheaderTypographyProps={{ variant: 'overline', sx: { fontSize: '14px', mb: 0, pb: 0 }, gutterBottom: true, color: 'text.disabled' }}
					/>
					<Grid container spacing={1}>
						<Grid component={Typography} color='text.disabled' item>
							<Tooltip arrow title={paymentMethod.type || ''}>
								{paymentMethod.type && TYPE_ICONS[paymentMethod.type]}
							</Tooltip>
						</Grid>
						<Grid component={Typography} color='text.disabled' item>
							<Tooltip arrow title={paymentMethod.active ? 'Active' : 'In-Active'}>
								{paymentMethod.active ? <CheckCircleTwoTone sx={{ fontSize: '26px' }} /> : <RemoveCircleTwoTone sx={{ fontSize: '26px' }} />}
							</Tooltip>
						</Grid>
						{/* eslint-disable-next-line eqeqeq*/}
						{paymentMethod.isDeleted == 1 && (
							<Grid component={Typography} color='text.disabled' item>
								<Tooltip arrow title={'Deleted'}>
									<DeleteForeverTwoTone sx={{ fontSize: '26px' }} />
								</Tooltip>
							</Grid>
						)}
					</Grid>
				</CardContent>
				<CardActions sx={{ mt: 0.1, p: 0, mb: 1, justifyContent: { xs: 'end', sm: 'end', md: 'end' } }}>
					{actions
						.filter(_ => _.btn)
						.map(action => (
							<Btn key={action.key} type='small' onClick={action.action(data)} {...action.props}>
								<Tooltip title={action.toolTip}>{action.icon}</Tooltip>
							</Btn>
						))}
				</CardActions>
			</CustomCard>
		</Grid>
	);
}
