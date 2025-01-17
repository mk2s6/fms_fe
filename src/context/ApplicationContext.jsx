import { useState, createContext, useEffect, useContext } from 'react';
import useAPICall from '../hooks/useAPICall';
import { TRANSACTION_TYPES } from '../utils/validations';
import { UserContext } from './UserContext';

export const ApplicationContext = createContext();

export const ApplicationContextProvider = props => {
	const [modules, setModules] = useState([]);
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [transactionModes, setTransactionModes] = useState([]);
	const [transactionCategories, setTransactionCategories] = useState([]);
	const [currencyCodes, setCurrencyCodes] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [transactionTypes, setTransactionTypes] = useState(TRANSACTION_TYPES);
	const { APIRequest } = useAPICall(false, false);
	const { loginStatus, UserContextFlag, registerUser, unRegisterUser } = useContext(UserContext);

	const loadFlags = () => ({
		modulesLoaded: !!modules || (modules && modules?.length),
		loginStatus,
	});

	const getUserProfile = async () => {
		try {
			const {
				data: [user],
			} = await APIRequest('USER_PROFILE');
			registerUser({ user });
		} catch (e) {
			console.log(e);

			// unRegisterUser();
		}
	};

	const refreshModules = async () => {
		try {
			const { data } = await APIRequest('GET_MODULES');
			setModules(data);
			loginStatus && (await getUserProfile());
		} catch (e) {
			console.log(e);
		}
	};

	const refreshPaymentMethods = async () => {
		try {
			const { data } = await APIRequest('GET_PAYMENT_METHODS_LIST');
			setPaymentMethods(data);
		} catch (e) {
			console.log(e);
		}
	};

	const refreshTransactionModes = async () => {
		try {
			const { data } = await APIRequest('GET_TRANSACTION_MODES');
			setTransactionModes(data);
		} catch (e) {
			console.log(e);
		}
	};

	const refreshTransactionCategories = async () => {
		try {
			const { data } = await APIRequest('GET_TRANSACTION_CATEGORIES');
			setTransactionCategories(data);
		} catch (e) {
			console.log(e);
		}
	};

	const refreshCurrencyCodes = async () => {
		try {
			const { data } = await APIRequest('GET_ALL_CURRENCY_CODES');
			setCurrencyCodes(data);
		} catch (e) {
			console.log(e);
		}
	};

	const refreshData = async () => {
		try {
			loginStatus && (await refreshPaymentMethods());
			loginStatus && (await refreshTransactionModes());
			loginStatus && (await refreshTransactionCategories());
			loginStatus && (await refreshCurrencyCodes());
		} catch (e) {
			console.log(e);
		}
	};

	const refreshMeta = async () => {
		try {
			await refreshModules();
			loginStatus && (await refreshData());
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		UserContextFlag && (async () => await refreshMeta())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [UserContextFlag, loginStatus]);

	return (
		<ApplicationContext.Provider
			value={{
				modules,
				loadFlags,
				paymentMethods,
				refreshData,
				transactionCategories,
				transactionModes,
				currencyCodes,
				transactionTypes,
			}}
		>
			{props.children}
		</ApplicationContext.Provider>
	);
};

export const ApplicationContextConsumer = ApplicationContext.Consumer;
