// const BASE_URL = 'http://192.168.1.3:4200' || process.env.REACT_APP_API_URL;

// const makeUrl = (url) => `${BASE_URL}${url}`;

// ------------------------------------------------
//
// AUTH RELATED ROUTES
//
// ------------------------------------------------
export const USER_LOGIN = ({ username, password, rememberMe }) => ({
	method: 'post',
	custom: true,
	login: true,
	url: `/api/users/login`,
	body: { username, password, rememberMe },
});

export const VALIDATE_USER_PIN = ({ pin }) => ({ method: 'post', url: `/api/users/validate/pin`, body: { pin } });
export const USER_REFRESH_BRANCH_TOKEN = ({ branch }) => ({ method: 'post', url: `/api/users/my/refresh-token-branch`, body: { branch } });
export const USER_LOGOUT = _data => ({ method: 'post', url: `/api/users/logout`, body: {} });
export const GET_MODULES = _data => ({ method: 'get', url: `/api/app/modules` });

// ------------------------------------------------------------------------------
//
// USER RELATED ROUTES
//
// ------------------------------------------------------------------------------
export const USER_REGISTER = ({ name, email, mobile, password, username }) => ({
	method: 'post',
	url: `/api/users/register`,
	body: { name, email, mobile, password, username },
});

export const USER_PROFILE = _data => ({ url: `/api/users/my/profile`, method: 'get' });
export const CHECK_USERNAME = ({ username }) => ({ url: `/api/users/username`, method: 'patch', body: { username } });
export const USER_USERNAME_UPDATE = ({ username }) => ({ method: 'put', url: `/api/users/my/username`, body: { username } });
export const USER_PIN_UPDATE = ({ pin }) => ({ method: 'post', url: `/api/users/my/pin`, body: { pin } });
export const USER_PASSWORD_UPDATE = ({ password }) => ({ method: 'post', url: `/api/users/my/password`, body: { password } });
export const USERS_LIST = ({ page_no, limit }) => ({ url: `/api/users/list?limit=${limit}&page_no=${page_no}` });
export const USER_PERMISSIONS = _data => ({ url: `/api/users/my/permissions` });

// --------------------------------------------------------------------
//
// Common Assets
//
// --------------------------------------------------------------------
// export const GET_COUNTRIES = () => ({ url: `/api/assets/commons/countries`, method: 'get' });
// export const GET_STATES = ({ country }) => ({ url: `/api/assets/commons/states/${country}`, method: 'get' });
// export const GET_CITIES = (56Y8T) => ({ url: `/api/assets/commons/cities/${state}`, method: 'get' });
export const GET_CURRENCY_CODES = ({ country }) => ({ url: `/api/assets/commons/currency-codes/${country || 'India'}`, method: 'get' });
export const GET_ALL_CURRENCY_CODES = _ => ({ url: `/api/assets/commons/currency-codes/all`, method: 'get' });
export const GET_TRANSACTION_MODES = () => ({ url: `/api/assets/commons/transaction-modes`, method: 'get' });
export const GET_TRANSACTION_CATEGORIES = () => ({ url: `/api/assets/commons/transaction-categories`, method: 'get' });

// --------------------------------------------------------------------
//
// Transactions related routes
//
// --------------------------------------------------------------------
export const GET_TRANSACTIONS_LIST = ({ page_no, limit, ledger, parent_transaction, lending }) => ({
	url: `/api/transactions?page_no=${page_no}&limit=${limit}${ledger ? `&ledger=${ledger}` : ''}${lending ? `&lending=${lending}` : ''}${
		parent_transaction ? `&parent_transaction=${parent_transaction}` : ''
	}`,
	method: 'get',
});

export const GET_TRANSACTION_DETAILS = ({ id }) => ({ url: `/api/transactions/${id}`, method: 'get' });

export const CREATE_TRANSACTION = ({ ...body }) => ({ url: `/api/transactions`, method: 'post', body });

// --------------------------------------------------------------------
//
// Ledgers related routes
//
// --------------------------------------------------------------------
export const GET_LEDGERS_LIST = ({ page_no, limit, ledger, parent_transaction, lending }) => ({
	url: `/api/ledgers`,
	method: 'get',
});
export const GET_LEDGERS_DETAILS = ({ id }) => ({ url: `/api/ledgers/${id}`, method: 'get' });

export const ADD_LEDGER = ({ ...body }) => ({
	url: `/api/ledgers`,
	method: 'post',
	body,
});

export const UPDATE_LEDGER = ({ id, ...body }) => ({
	url: `/api/ledgers/${id}`,
	method: 'put',
	body,
});

export const DELETE_LEDGER = ({ id }) => ({
	url: `/api/ledgers/${id}`,
	method: 'delete',
});

// --------------------------------------------------------------------
//
// Lendings related routes
//
// --------------------------------------------------------------------
export const GET_LENDINGS_LIST = ({ page_no, limit, ledger, parent_transaction, lending }) => ({
	url: `/api/lendings`,
	method: 'get',
});

export const ADD_LENDING = ({ ...body }) => ({
	url: `/api/lendings`,
	method: 'post',
	body,
});

export const UPDATE_LENDING = ({ id, ...body }) => ({
	url: `/api/lendings/${id}`,
	method: 'put',
	body,
});

export const DELETE_LENDING = ({ id }) => ({
	url: `/api/lendings/${id}`,
	method: 'delete',
});

export const SETTLE_LENDING = ({ id }) => ({
	url: `/api/lendings/settle/${id}`,
	method: 'put',
});

export const GET_ACTIVE_LENDINGS = ({ settlement }) => ({
	url: `/api/lendings?status=1`,
	method: 'get',
});

export const GET_LENDINGS_DETAILS = ({ id }) => ({ url: `/api/lendings/${id}`, method: 'get' });

// --------------------------------------------------------------------
//
// Transactions related routes
//
// --------------------------------------------------------------------
export const GET_PAYMENT_METHODS_LIST = ({ page_no = 1, limit = 10 }) => ({
	url: `/api/payment-methods?page_no=${page_no}&limit=${limit}`,
	method: 'get',
});
export const GET_PAYMENT_METHOD_DETAILS = ({ id }) => ({ url: `/api/payment-methods/${id}`, method: 'get' });
export const ADD_PAYMENT_METHOD = ({ ...body }) => ({ url: `/api/payment-methods`, method: 'post', body });
export const UPDATE_PAYMENT_METHOD = ({ id, ...body }) => ({
	url: `/api/payment-methods/${id}`,
	method: 'put',
	body,
});
export const DELETE_PAYMENT_METHOD = ({ id }) => ({
	url: `/api/payment-methods/${id}`,
	method: 'delete',
});
export const TOGGLE_PAYMENT_METHOD_STATUS = ({ active, id }) => ({
	url: `/api/payment-methods/${id}/status`,
	method: 'put',
	body: { active },
});

// --------------------------------------------------------------------
//
// Dashboard related routes
//
// --------------------------------------------------------------------
export const GET_TRANSACTION_SUMMARY = ({ months = 6, level = 'monthly' }) => ({
	url: `/api/dashboard/summary/${level}?months=${months}`,
	method: 'get',
});