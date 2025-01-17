/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { Box, Divider, Grid, ListItemText, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { formatDisplayDate } from '../../commons/dates';
import useAPICall from '../../hooks/useAPICall';
import { getCurrencyForListFormat } from '../../utils';

export default function TransactionDetails({ id, open, toggle }) {
	const { APIRequest } = useAPICall();
	const [details, setDetails] = useState(null);

	const Puller = styled(Box)(({ theme }) => {
		return {
			width: 30,
			height: 10,
			backgroundColor: theme.palette.divider,
			borderRadius: 4,
			top: 8,
			left: 'calc(50% - 15px)',
		};
	});

	const getTransactionDetails = async () => {
		try {
			const { data } = await APIRequest('GET_TRANSACTION_DETAILS', { id });
			console.log(data[0]);
			setDetails(data[0]);
		} catch (e) {}
	};

	useEffect(() => {
		open &&
			(async () => {
				await getTransactionDetails();
			})();
	}, [open]);

	return (
		<>
			{open && details && (
				<SwipeableDrawer
					anchor={'bottom'}
					open={open}
					variant='temporary'
					hideBackdrop={false}
					onClose={toggle}
					elevation={24}
					ModalProps={{ sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
					PaperProps={{
						variant: 'custom-paper',
						sx: {
							m: 'auto',
							width: { xs: '98%', sm: '98%', md: '75%', lg: '60%', xl: '50%' },
							borderTopLeftRadius: 8,
							borderTopRightRadius: 8,
						},
					}}
					SlideProps={{ transitionDuration: 1000, easing: { enter: 2500, exit: 2500 } }}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Puller />
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Typography sx={{ textAlign: 'center' }}>
							<ListItemText
								primary={details.purpose}
								primaryTypographyProps={{ sx: { textTransform: 'uppercase', fontWeight: 'bold' }, variant: 'h6' }}
								secondary={formatDisplayDate(details.date)}
								secondaryTypographyProps={{ sx: { fontSize: 14 } }}
							/>
						</Typography>
					</Box>
					<Box sx={{ minHeight: '300px', width: '80%', margin: 'auto', ml: { sm: 2, lg: 14 } }}>
						<Grid
							container={true}
							sx={{ minWidth: '100%' }}
							direction={['row']}
							justifyContent='center'
							spacing={2}
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
						>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ width: '100%' }}>
								<ListItemText
									primary={getCurrencyForListFormat(details.value, '', details.currencyCode)}
									primaryTypographyProps={{ sx: { textTransform: 'uppercase' }, variant: 'h5' }}
									secondary={`${details.type}`}
									secondaryTypographyProps={{ sx: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ width: '100%' }}>
								<ListItemText
									primary={details.mode}
									primaryTypographyProps={{ sx: { textTransform: 'uppercase' }, variant: 'h5' }}
									secondary={'Payment Mode'}
									secondaryTypographyProps={{ sx: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ width: '100%' }}>
								<ListItemText
									primary={details.category}
									primaryTypographyProps={{ sx: { textTransform: 'uppercase' }, variant: 'h5' }}
									secondary={'Category'}
									secondaryTypographyProps={{ sx: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ width: '100%' }}>
								<ListItemText
									primary={details.description}
									primaryTypographyProps={{ variant: 'h5' }}
									secondary={'Details'}
									secondaryTypographyProps={{ sx: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item xs={12} />
							<Grid item xs={12} />
						</Grid>
					</Box>
				</SwipeableDrawer>
			)}
		</>
	);
}
