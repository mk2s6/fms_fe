import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserContextProvider = props => {
	const [token, setToken] = useState('');
	const [loginStatus, setLoginStatus] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const key = localStorage.getItem('token');
		if (key) {
			setToken(key);
			setLoginStatus(true);
		} else {
			setToken(null);
			setLoginStatus(false);
		}
	}, []);

	useEffect(() => {
		if (token) setLoginStatus(true);
		else setLoginStatus(false);
	}, [token]);

	const registerUser = (data, _token) => {
		localStorage.setItem('token', _token);
		setToken(_token);
	};

	const unRegisterUser = () => {
		localStorage.removeItem('token');
		setToken('');
		navigate('/signin');
	};

	return <UserContext.Provider value={{ registerUser, token, loginStatus, unRegisterUser }}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
