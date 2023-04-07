import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockContext } from './LockContext';

const UserContext = createContext();

const UserContextProvider = props => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState('');
	const [loginStatus, setLoginStatus] = useState(false);
	const navigate = useNavigate();
	const { setLock } = useContext(LockContext);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('user'));
		const key = localStorage.getItem('token');
		if (data && key) {
			setUser(data);
			setToken(key);
			setLoginStatus(true);
		} else {
			setUser(null);
			setToken(null);
			setLoginStatus(false);
		}
	}, []);

	useEffect(() => {
		if (user && token && user !== '{}') setLoginStatus(true);
		else setLoginStatus(false);
	}, [user, token]);

	const registerUser = (data, _token) => {
		localStorage.setItem('user', JSON.stringify(data));
		setUser(data);
		localStorage.setItem('token', _token);
		setToken(_token);
	};

	const unRegisterUser = () => {
		localStorage.setItem('user', '{}');
		setUser(null);
		localStorage.setItem('token', '');
		setLock(false);
		setToken('');
		navigate('/');
	};

	return <UserContext.Provider value={{ user, registerUser, token, loginStatus, unRegisterUser }}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
