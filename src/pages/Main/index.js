import Header from '../Partials/Header';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
	const { allRoutes, NoAuthAppBar } = useContext(RoutesContext);
	const navigate = useNavigate();
	const location = useLocation();
	const { loginStatus, unRegisterUser } = useContext(UserContext);

	useEffect(() => {
		console.log(allRoutes);
		if (loginStatus && location.pathname === '/signout') {
			unRegisterUser();
			navigate(NoAuthAppBar[0].route);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loginStatus, NoAuthAppBar]);

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
						<Route path='*' element={<Navigate to={'/404'} />} />
					</Routes>
					<Footer />
				</>
			)}
		</>
	);
}

export default Main;
