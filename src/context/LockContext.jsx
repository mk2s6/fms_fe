import { useState, createContext } from 'react';

export const LockContext = createContext({
  lock: false,
  setLock: () => {},
});

export const LockContextProvider = props => {
  const [lock, setLock] = useState(false);
  return <LockContext.Provider value={{ lock, setLock }}>{props.children}</LockContext.Provider>;
};

export const LockContextConsumer = LockContext.Consumer;
