import TopBar from '../../../components/TopBar';
import Navigation from '../../../components/Navigation';
import { useContext } from 'react';
import { RoutesContext } from '../../../context/RoutesContext';

function Header({ tab, setTab }) {
  const { navRoutes } = useContext(RoutesContext);

  return (
    <>
      <TopBar />
      <Navigation navRoutes={navRoutes} />
    </>
  );
}

export default Header;
