import { Card, CardActions, CardContent, CardHeader, Grid, Tooltip, Typography } from '@mui/material';
import { Btn } from '../System/Inputs';
import { useState } from 'react';

import { getCurrencyForListFormat } from '../../utils';
import { formatDisplayDate } from '../../commons/dates';

export default function LendingCard({ data, actions, ...props }) {
	const [lending] = useState(data || {});

	return (
		<Grid item key={lending.id} xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
			<Card sx={{ minHeight: 80, p: 1, pl: 2, pt: 2 }} color='secondary' variant='elevation' elevation={20}>
				<CardHeader
					sx={{ p: 0 }}
					title={getCurrencyForListFormat(lending.amount, lending.borrowingStatus, lending.currencyCode)}
					titleTypographyProps={{ variant: 'h6', sx: { fontSize: '20px', mb: 0, pb: 0 }, gutterBottom: false, color: 'text.primary' }}
					subheader={`${lending.borrowingStatus ? 'Borrowed from' : 'Lent to'} ${lending.toName}`}
					subheaderTypographyProps={{ variant: 'caption', sx: { fontSize: '16px', mb: 0, pb: 0 }, gutterBottom: true, color: 'text.disabled' }}
				/>
				<CardContent sx={{ p: 0 }}>
					<Grid container spacing={0.5}>
						<Grid component={Typography} item xs={12} variant='overline'>
							{formatDisplayDate(lending.madeOn)}
						</Grid>
					</Grid>
				</CardContent>
				<CardActions sx={{ mt: 0.1, p: 0, mb: 1, justifyContent: { xs: 'start', sm: 'start', md: 'end' } }}>
					{actions.map(action => (
						<Btn key={action.key} type='small' onClick={action.action(data)} {...action.props}>
							<Tooltip title={action.toolTip}>{action.icon}</Tooltip>
						</Btn>
					))}
				</CardActions>
			</Card>
		</Grid>
	);
}
