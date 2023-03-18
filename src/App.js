import Main from './pages/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Button, Grow } from '@mui/material';
import Loader from './components/Loader';
import Lock from './components/Lock';
import { LoaderContextProvider } from './context/LoaderContext';
import { LockContextProvider } from './context/LockContext';
import { UserContextProvider } from './context/UserContext';
import { ApplicationContextProvider } from './context/ApplicationContext';
import { RoutesContextProvider } from './context/RoutesContext';

const notistackRef = React.createRef();

const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};

function App() {
  return (
    <SnackbarProvider
      ref={notistackRef}
      autoHideDuration={1500}
      maxSnack={3}
      TransitionComponent={Grow}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      preventDuplicate
      action={key => (
        <Button color='error' onClick={onClickDismiss(key)}>
          Close
        </Button>
      )}
      sx={{ zIndex: 1200 }}
    >
      <Router>
        <LoaderContextProvider>
          <UserContextProvider>
            <ApplicationContextProvider>
              <RoutesContextProvider>
                <LockContextProvider>
                  <Loader />
                  <Lock />
                  <Main
                    sx={{
                      p: 0,
                      m: 0,
                    }}
                  />
                </LockContextProvider>
              </RoutesContextProvider>
            </ApplicationContextProvider>
          </UserContextProvider>
        </LoaderContextProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
