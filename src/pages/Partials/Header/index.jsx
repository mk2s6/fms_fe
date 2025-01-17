import TopBar from '../../../components/TopBar';
import Navigation from '../../../components/Navigation';
import { useContext } from 'react';
import { RoutesContext } from '../../../context/RoutesContext';
import { Container } from '@mui/material';

function Header({ tab, setTab }) {
	const { navRoutes } = useContext(RoutesContext);

	return (
		<>
			<TopBar />
			<Navigation navRoutes={navRoutes} />
			<Container sx={{ height: '24px' }} />
		</>
	);
}

export default Header;
