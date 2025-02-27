import * as APIServices from '../services/API';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { LoaderContext } from '../context/LoaderContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { decryptResponse, encryptRequest } from '../utils/security';
console.log(import.meta.env);

// const BASE_URL = import.meta.env.VITE_APP_ENV === 'LOCAL' ? 'http://localhost:4200' : import.meta.env.VITE_APP_API_URL || 'http://localhost:4200';

const request = axios.create({ timeout: 3000 });

const useAPICall = (getNotification = false, loader = true) => {
	const { enqueueSnackbar } = useSnackbar();
	const { setLoader } = useContext(LoaderContext);
	const { token, unRegisterUser } = useContext(UserContext);

	request.defaults.headers = { 'x-id-token': token };

	const makeAPICall = async ({ url, method, body, customHeaders = null, login }) => {
		return request({
			url,
			method,
			// data: encryptRequest(body),
			data: body,
			...(customHeaders ? { headers: customHeaders } : {}),
		});
	};

	const APIRequest = async (URL, data = {}, notification) => {
		loader && setLoader(true);
		try {
			const response = await makeAPICall(APIServices[URL](data));
			(getNotification || notification) && enqueueSnackbar(response.data.data.description, { variant: 'success' });
			setLoader(false);

			return {
				data: response.data.data.items,
				// data: decryptResponse(response.data.data.items),
				...(!token ? { token: response.headers['x-id-token'] } : {}),
			};
		} catch (e) {
			console.log(e);
			let err = e || {};

			if (e?.response?.data?.code === '20001') {
				enqueueSnackbar(e?.response?.data.message, {
					variant: 'warning',
				});
				return;
			}

			if ([401, 403, 402].includes(err?.response?.status)) unRegisterUser();

			if (err.code === 'ECONNABORTED') {
				unRegisterUser();
			}

			if (!(e.message === 'Network Error')) err = e?.response?.data;
			else err.message = 'Internal Server Error - Please try again later.';
			if (!err?.message) err.message = 'Internal Server Error - Please try again later.';
			setLoader(false);
			enqueueSnackbar(err.message, {
				variant: e?.response?.status === 422 ? 'warning' : 'error',
			});
			return Promise.reject(err);
		}
	};
	return { APIRequest };
};

export default useAPICall;
