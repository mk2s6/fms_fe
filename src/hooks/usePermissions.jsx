import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import useAPICall from './useAPICall';

function usePermissions() {
  const [permissions, setPermissions] = useState({});
  const { APIRequest } = useAPICall();
  const { loginStatus } = useContext(UserContext);

  const refreshPermissions = async () => {
    try {
      const { data } = await APIRequest('EMPLOYEE_PERMISSIONS');
      setPermissions(data[0]);
    } catch (e) {}
  };

  useEffect(() => {
    loginStatus &&
      (async () => {
        await refreshPermissions();
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { permissions, refreshPermissions };
}

export default usePermissions;
