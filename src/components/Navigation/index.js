import { AppBar, Box, Tabs, Tab, Toolbar, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RoutesContext } from '../../context/RoutesContext';

function Navigation() {
	const [tab, setTab] = useState('_null');
	let location = useLocation();

	const { navRoutes, NoAuthAppBar } = useContext(RoutesContext);

	useEffect(() => {
		const TAB = navRoutes.filter(e => location.pathname.includes(e.route))[0]?.id;
		if (location.pathname === NoAuthAppBar.route) setTab('_null');
		else setTab(TAB || '_undefined');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navRoutes, location.pathname]);

	const handleChange = (_event, newTabIndex) => {
		setTab(newTabIndex);
	};

	return (
		<>
			<Box
				sx={{
					position: 'sticky',
					top: 56,
					left: 0,
					zIndex: 1000,
				}}
			>
				<AppBar position='static' color='secondary'>
					<Toolbar
						variant='dense'
						sx={{
							alignItems: 'center',
							margin: 'auto',
							maxWidth: '92%',
						}}
					>
						<Tabs
							value={tab}
							onChange={handleChange}
							variant='scrollable'
							scrollButtons={true}
							allowScrollButtonsMobile
							indicatorColor='primary'
							textColor='inherit'
						>
							<Tab key={'_null'} value={'_null'} label={''} sx={{ width: 0, height: 0, minWidth: 0, maxWidth: 0, hidden: true, p: 0 }} disabled />
							{navRoutes && navRoutes.map(r => <Tab label={r.label} key={r.id} value={r.id} component={Link} to={r.route} />)}
							<Tab
								key={'_undefined'}
								value={'_undefined'}
								label={''}
								sx={{ width: 0, height: 0, minWidth: 0, maxWidth: 0, p: 0, hidden: true }}
								disabled
							/>
						</Tabs>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}

export default Navigation;
