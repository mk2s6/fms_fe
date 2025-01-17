import Header from '../Partials/Header';
import { Box, Container, createTheme, Paper } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Footer from '../Partials/Footer';
import { RoutesContext } from '../../context/RoutesContext';
import { DialogsProvider } from '@toolpad/core';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Container component={Paper} variant='custom-paper' role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</Container>
	);
}

function Main() {
	try {
		const { allRoutes } = useContext(RoutesContext);
		return (
			<>
				{!!allRoutes.length && (
					<DialogsProvider>
						<Header />
						<Routes>
							{!!allRoutes.length && allRoutes.map(r => <Route component={TabPanel} key={r.id} path={r.route} index={r.id} element={r.component} />)}
							<Route path='*' element={<Navigate to={allRoutes[0].route} />} />
						</Routes>
						<Footer />
					</DialogsProvider>
				)}
			</>
		);
	} catch (e) {
		console.log(e);
	}
}

export default Main;
