import { useState, createContext, useEffect, useContext } from 'react';
import useAPICall from '../hooks/useAPICall';
import { UserContext } from './UserContext';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
  const [modules, setModules] = useState([]);
  const { APIRequest } = useAPICall(false, false);
  const { loginStatus } = useContext(UserContext);

  const loadFlags = () => ({
    modulesLoaded: !!modules || (modules && modules?.length),
    loginStatus,
  });

  const refreshModules = async () => {
    try {
      const { data } = await APIRequest('GET_MODULES');
      setModules(data);
    } catch (e) {}
  };

  const refreshMeta = async () => {
    try {
      await refreshModules();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => await refreshMeta())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  return (
    <RestaurantContext.Provider
      value={{
        modules,
        loadFlags,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};

export const RestaurantContextConsumer = RestaurantContext.Consumer;
