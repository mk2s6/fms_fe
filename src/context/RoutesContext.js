import { createContext, useContext, useEffect, useState } from 'react';
import { ApplicationContext } from './ApplicationContext';
import { MODULES } from '../commons/routes';

export const RoutesContext = createContext();

export const RoutesContextProvider = props => {
	const { modules } = useContext(ApplicationContext);

	const [appBarRoutes, setAppBarRoutes] = useState([]);
	const [homeRoutes, setHomeRoutes] = useState([]);
	const [titleRoutes, setTitleRoutes] = useState([]);
	const [navRoutes, setNavRoutes] = useState([]);
	const [allRoutes, setAllRoutes] = useState([]);
	const [_default, setDefaultRoute] = useState([]);
	const [NoAuthAppBar, setNoAuthAppBarRoute] = useState([]);

	const refreshRoutes = () => {
		const routes = MODULES.filter(M => modules.filter(module => M.code === module.code).length)
			.map(M => {
				return { ...M, ...modules.filter(module => M.code === module.code)[0] };
			})
			.sort((a, b) => a.sort - b.sort);
		setAllRoutes(routes);
	};

	useEffect(() => {
		if (allRoutes.length > 0) {
			setAppBarRoutes(allRoutes.filter(R => R.in_app_bar));
			setTitleRoutes(allRoutes.filter(R => R.title));
			setHomeRoutes(allRoutes.filter(R => R.in_home));
			setNavRoutes(allRoutes.filter(R => R.in_nav));
			setDefaultRoute(allRoutes.filter(R => R.default));
			setNoAuthAppBarRoute(allRoutes.filter(R => R.noAuth));
		}
	}, [allRoutes]);

	useEffect(() => {
		((MODULES && MODULES.length) || (modules && modules.length)) && refreshRoutes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modules]);

	return (
		<RoutesContext.Provider value={{ appBarRoutes, homeRoutes, titleRoutes, navRoutes, allRoutes, _default, NoAuthAppBar }}>
			{props.children}
		</RoutesContext.Provider>
	);
};

export const RoutesContextConsumer = RoutesContext.Consumer;
