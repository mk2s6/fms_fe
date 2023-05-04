import Header from '../Partials/Header';
import { Box, Container } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Footer from '../Partials/Footer';
import { RoutesContext } from '../../context/RoutesContext';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Container role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</Container>
	);
}

function Main({ ...props }) {
	const { allRoutes } = useContext(RoutesContext);
	const { loginStatus } = useContext(UserContext);

	return (
		<>
			{!!allRoutes.length && (
				<>
					<Header />
					<Routes>
						{!!allRoutes.length &&
							allRoutes
								.filter(A => !A.noAuth === loginStatus)
								.map(r => <Route component={TabPanel} key={r.id} path={r.route} index={r.id} element={r.component} />)}
						<Route path='*' element={<Navigate to={allRoutes[0].route} />} />
					</Routes>
					<Footer />
				</>
			)}
		</>
	);
}

export default Main;
