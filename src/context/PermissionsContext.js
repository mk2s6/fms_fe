import { useState, createContext, useEffect, useContext } from 'react';
import useAPICall from '../hooks/useAPICall';
import { UserContext } from './UserContext';

export const PermissionsContext = createContext();

export const PermissionsContextProvider = props => {
  const [permissions, setPermissions] = useState({});
  const { loginStatus } = useContext(UserContext);
  const { APIRequest } = useAPICall(false, false);

  const refreshPermissions = async () => {
    try {
      const { data } = await APIRequest('EMPLOYEE_PERMISSIONS');
      setPermissions(data[0]);
      return data[0];
    } catch (e) {
      return {};
    }
  };

  useEffect(() => {
    if (loginStatus) {
      (async () => {
        await refreshPermissions();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPermissions = async () => {
    return await refreshPermissions();
  };

  return <PermissionsContext.Provider value={{ permissions, getPermissions }}>{props.children}</PermissionsContext.Provider>;
};

export const PermissionsContextConsumer = PermissionsContext.Consumer;
