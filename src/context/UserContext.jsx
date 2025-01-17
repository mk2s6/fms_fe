import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserContextProvider = props => {
	const [token, setToken] = useState(undefined);
	const [loginStatus, setLoginStatus] = useState(false);
	const [UserContextFlag, setUserContextFlag] = useState(false);
	const [user, setUser] = useState({});

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
		token !== undefined && setUserContextFlag(true);
	}, [token]);

	useEffect(() => {
		if (token) setLoginStatus(true);
		else setLoginStatus(false);
	}, [token]);

	const registerUser = ({ user, token = null }) => {
		token && localStorage.setItem('token', token);
		token && setToken(token);
		user && setUser(user);
		navigate('/home');
	};

	const unRegisterUser = () => {
		localStorage.removeItem('token');
		setToken('');
		navigate('/signin');
	};

	return (
		<UserContext.Provider value={{ registerUser, UserContextFlag, token, loginStatus, user, unRegisterUser }}>{props.children}</UserContext.Provider>
	);
};

export { UserContext, UserContextProvider };
