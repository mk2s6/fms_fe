import { Box, Container, Paper, Stack, Typography, Grid2 as Grid, ListItem, Card } from '@mui/material';
import MyPieChart from '../../components/System/Charts/MyPieChart';
import MyLineChart from '../../components/System/Charts/MyLineChart';
import MyBarChart from '../../components/System/Charts/MyBarChart';
import { useEffect, useState } from 'react';
import useAPICall from '../../hooks/useAPICall';

export default function Dashboard() {
	const [monthsSummary, setMonthsSummary] = useState([]);
	const { APIRequest } = useAPICall(false);

	const getTransactionSummary = async () => {
		try {
			const { data } = await APIRequest('GET_TRANSACTION_SUMMARY');
			setMonthsSummary(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getTransactionSummary();
	}, []);

	return (
		<Container maxWidth='lg' sx={{ mt: 1, p: 2 }}>
			<Grid
				container
				spacing={4}
				columns={{
					xs: 1,
					lg: 3,
					xl: 3,
				}}
			>
				<Grid minHeight={240} size={1}>
					<MyLineChart
						xLabels={monthsSummary.map(s => s.month)}
						dataSeries={[monthsSummary.map(s => parseFloat(s.credits)), monthsSummary.map(s => parseFloat(s.debits))]}
					/>
				</Grid>
				<Grid minHeight={240} size={1}>
					<MyPieChart />
				</Grid>
				<Grid minHeight={240} size={1}>
					<MyBarChart />
				</Grid>
			</Grid>
		</Container>
	);
}
