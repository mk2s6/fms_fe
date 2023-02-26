import { createContext, useContext, useEffect, useState } from 'react';
import { RestaurantContext } from './RestaurantContext';
import { MODULES } from '../commons/routes';

export const RoutesContext = createContext();

export const RoutesContextProvider = props => {
  const { modules } = useContext(RestaurantContext);

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
    console.log(allRoutes);
    allRoutes.length && setAppBarRoutes(allRoutes.filter(R => R.in_app_bar));
    allRoutes.length && setTitleRoutes(allRoutes.filter(R => R.title));
    allRoutes.length && setHomeRoutes(allRoutes.filter(R => R.in_home));
    allRoutes.length && setNavRoutes(allRoutes.filter(R => R.in_nav));
    allRoutes.length && setDefaultRoute(allRoutes.filter(R => R.default));
    allRoutes.length && setNoAuthAppBarRoute(allRoutes.filter(R => R.noAuth));
  }, [allRoutes]);

  useEffect(() => {
    ((MODULES && MODULES.length) || (modules && modules.length)) && refreshRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MODULES, modules]);

  return (
    <RoutesContext.Provider value={{ appBarRoutes, homeRoutes, titleRoutes, navRoutes, allRoutes, _default, NoAuthAppBar }}>
      {props.children}
    </RoutesContext.Provider>
  );
};

export const RoutesContextConsumer = RoutesContext.Consumer;
