import Header from '../Partials/Header';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { LockContext } from '../../context/LockContext';
import Footer from '../Partials/Footer';
import { RoutesContext } from '../../context/RoutesContext';
// import usePermissions from '../../hooks/usePermissions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Container>
  );
}

function Main({ routes }) {
  const { allRoutes, _default, NoAuthAppBar } = useContext(RoutesContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginStatus, unRegisterUser } = useContext(UserContext);
  const { lock } = useContext(LockContext);

  useEffect(() => {
    window.onload = function () {
      const path = localStorage.getItem('beforeReloadPath');
      localStorage.setItem('beforeReloadPath', '');
      navigate(path || _default[0].route);
    };

    window.onbeforeunload = function () {
      localStorage.setItem('beforeReloadPath', location.pathname);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => {
    console.log(loginStatus, location.pathname);
    if (loginStatus && NoAuthAppBar.length && NoAuthAppBar.filter(N => N.route === location.pathname).length) navigate('/home');
    if (loginStatus && location.pathname === '/signout') {
      unRegisterUser();
      navigate(NoAuthAppBar[0].route);
    }

    if (!loginStatus && NoAuthAppBar.length) {
      navigate(NoAuthAppBar[0].route);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus, NoAuthAppBar, _default]);

  return (
    <>
      {!lock && (
        <>
          <Header />
          <Routes>
            {!!allRoutes.length &&
              allRoutes
                .filter(A => !A.noAuth === loginStatus)
                .map(r => <Route component={TabPanel} key={r.id} path={r.route} index={r.id} element={r.component}></Route>)}
            <Route path='*' element={<Navigate to={loginStatus ? '/home' : '/signin'} />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default Main;
