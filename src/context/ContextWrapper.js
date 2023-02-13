import { useContext, useEffect } from 'react';
import { LockContext } from './LockContext';
import { RestaurantContext } from './RestaurantContext';
import { UserContext } from './UserContext';

function ContextWrapper(props) {
  const { loginStatus, user } = useContext(UserContext);
  useContext(RestaurantContext);
  useContext(LockContext);
  useEffect(() => {}, [loginStatus, user]);
  return <>{props.children}</>;
}

export default ContextWrapper;
