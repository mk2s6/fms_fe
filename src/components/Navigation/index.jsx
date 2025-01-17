import { AppBar, Box, Tabs, Tab, Toolbar } from '@mui/material';
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
					width: '100%',
					alignItems: 'center',
				}}
			>
				<AppBar
					position='static'
					sx={{
						width: '100%',
						alignItems: 'center',
					}}
					PaperProps={{ variant: 'elevation', elevation: 4, alignItems: 'center' }}
				>
					<Toolbar
						variant='dense'
						sx={{
							alignItems: 'center',
							margin: { xs: 'none', s: 'none', m: 'auto', l: 'auto', xl: 'auto' },
							maxWidth: { xs: '100%', m: '92%' },
						}}
					>
						<Tabs value={tab} onChange={handleChange} variant='scrollable' scrollButtons={'auto'} allowScrollButtonsMobile textColor='inherit'>
							<Tab
								disableRipple={true}
								key={'_null'}
								value={'_null'}
								label={''}
								sx={{ width: 0, height: 0, minWidth: 0, maxWidth: 0, hidden: true, p: 0 }}
								disabled
							/>
							{navRoutes && navRoutes.map(r => <Tab disableRipple={true} label={r.label} key={r.id} value={r.id} component={Link} to={r.route} />)}
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
