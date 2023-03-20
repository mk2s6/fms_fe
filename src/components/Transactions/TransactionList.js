import { Container, Divider, ListItem, MenuItem, Pagination, Paper, Select, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import useAPICall from '../../hooks/useAPICall';
import TransactionListItem from './TransactionListItem';

const rowsPerPageConfig = [1, 5, 10, 15, 20, 25, 50, 100];

export default function TransactionsList({ API, filters, reload, setReload, setClickType, currentPage, ...props }) {
	const [data, setData] = useState([]);
	const [page_no, setCurrentPage] = useState(currentPage || 1);
	const [limit, setLimit] = useState(rowsPerPageConfig[1]);
	const [totalPages, setTotalPages] = useState(0);
	const { APIRequest } = useAPICall();

	useEffect(() => {
		reload &&
			(async () => {
				await getDataRows(currentPage || 1, limit);
				setReload(false);
			})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	const getDataRows = async (page_no, limit) => {
		try {
			const { data } = await APIRequest(API, { page_no, limit });
			setData(data.items);
			setTotalPages(data.totalPages);
			return data.items;
		} catch (e) {}
	};

	useEffect(() => {
		(async () => {
			currentPage && (await getDataRows(currentPage || 1, limit));
		})();
	});

	useEffect(() => {
		(async () => {
			const rows = await getDataRows(page_no, limit);
			rows.length === 0 && setCurrentPage(1);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page_no, limit]);

	const handlePageChange = (e, v) => {
		setCurrentPage(v);
	};

	const handleLimitChange = e => {
		setLimit(e.target.value);
	};

	return (
		<>
			<Container component={Box} maxWidth='lg' sx={{ mt: 1, p: 0.5 }} disableGutters>
				{!!data && data.length === 0 && (
					<Box component={Paper} sx={{ width: '70%', m: 'auto' }} justifyContent='center' alignItems='center'>
						<Stack sx={{ width: '100%', height: '100px' }} direction={'column'} justifyContent='center' alignItems='center'>
							<Typography variant='button' sx={{ fontSize: 16 }}>
								No Transactions exist.
							</Typography>
						</Stack>
					</Box>
				)}
				{!!data && data.length > 0 && (
					<Box component={Paper} sx={{ minWidth: '100%' }} justifyContent='center'>
						<Stack
							sx={{ width: '100%' }}
							direction={'column'}
							divider={<Divider sx={{ width: '85%' }} orientation='horizontal' />}
							alignItems='center'
						>
							{data.map(row => (
								<TransactionListItem key={row.id} data={row} />
							))}
						</Stack>
						<Stack>
							<Stack
								sx={{ width: '100%' }}
								justifyContent='center'
								alignItems={'center'}
								direction={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
							>
								<ListItem sx={{ display: '-webkit-box', '-webkit-box-pack': { xs: 'center', sm: 'center', md: 'end' } }}>
									Rows:
									<Select sx={{ ml: 1 }} size='small' id='limit-change' value={limit} onChange={handleLimitChange} autoWidth dense>
										{rowsPerPageConfig.map(L => (
											<MenuItem value={L}>{L}</MenuItem>
										))}
									</Select>
								</ListItem>
								<ListItem sx={{ display: '-webkit-box', '-webkit-box-pack': { xs: 'center', sm: 'center', md: 'start' } }}>
									<Pagination
										boundaryCount={2}
										variant='outlined'
										shape='rounded'
										page={page_no}
										defaultPage={page_no}
										onChange={handlePageChange}
										count={totalPages}
									/>
								</ListItem>
							</Stack>
						</Stack>
					</Box>
				)}
			</Container>
		</>
	);
}
