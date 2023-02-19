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
  url: `/users/login`,
  body: { username, password, rememberMe },
});

export const VALIDATE_USER_PIN = ({ pin }) => ({ method: 'post', url: `/users/validate/pin`, body: { pin } });
export const USER_REFRESH_BRANCH_TOKEN = ({ branch }) => ({ method: 'post', url: `/users/my/refresh-token-branch`, body: { branch } });
export const USER_LOGOUT = _data => ({ method: 'post', url: `/users/logout`, body: {} });
export const GET_MODULES = _data => ({ method: 'get', url: `/app/modules` });

// ------------------------------------------------------------------------------
//
// USER RELATED ROUTES
//
// ------------------------------------------------------------------------------
export const USER_REGISTER = ({ name, email, mobile, password, username }) => ({
  method: 'post',
  url: `/users/register`,
  body: { name, email, mobile, password, username },
});

export const USER_PROFILE = _data => ({ url: `/users/my/profile`, method: 'get' });
export const USER_USERNAME_UPDATE = ({ username }) => ({ method: 'put', url: `/users/my/username`, body: { username } });
export const USER_PIN_UPDATE = ({ pin }) => ({ method: 'post', url: `/users/my/pin`, body: { pin } });
export const USER_PASSWORD_UPDATE = ({ password }) => ({ method: 'post', url: `/users/my/password`, body: { password } });
export const USERS_LIST = ({ page_no, limit }) => ({ url: `/users/list?limit=${limit}&page_no=${page_no}` });
export const USER_PERMISSIONS = _data => ({ url: `/users/my/permissions` });

// --------------------------------------------------------------------
//
// Common Assets
//
// --------------------------------------------------------------------
// export const GET_COUNTRIES = () => ({ url: `/assets/commons/countries`, method: 'get' });
// export const GET_STATES = ({ country }) => ({ url: `/assets/commons/states/${country}`, method: 'get' });
// export const GET_CITIES = (56Y8T) => ({ url: `/assets/commons/cities/${state}`, method: 'get' });
export const GET_CURRENCY_CODES = ({ country }) => ({ url: `/assets/commons/currency-codes/${country || 'India'}`, method: 'get' });
export const GET_TRANSACTION_CATEGORIES = () => ({ url: `/assets/commons/payment/modes`, method: 'get' });
export const GET_TRANSACTION_MODES = () => ({ url: `/assets/commons/transaction-categories`, method: 'get' });

// --------------------------------------------------------------------
//
// Transactions related routes
//
// --------------------------------------------------------------------
export const GET_TRANSACTIONS_LIST = ({ page_no, limit, ledger, parent_transaction, lending }) => ({
  url: `/transactions?page_no=${page_no}&limit=${limit}${ledger ? `&ledger=${ledger}` : ''}${lending ? `&lending=${lending}` : ''}${
    parent_transaction ? `&parent_transaction=${parent_transaction}` : ''
  }`,
  method: 'get',
});
export const GET_TRANSACTION_DETAILS = ({ id }) => ({ url: `/transaction/${id}`, method: 'get' });

// --------------------------------------------------------------------
//
// Ledgers related routes
//
// --------------------------------------------------------------------
export const GET_LEDGERS_LIST = ({ page_no, limit, ledger, parent_transaction, lending }) => ({
  url: `/ledgers`,
  method: 'get',
});
export const GET_LEDGERS_DETAILS = ({ id }) => ({ url: `/ledgers/${id}`, method: 'get' });

// --------------------------------------------------------------------
//
// Lendings related routes
//
// --------------------------------------------------------------------
export const GET_LENDINGS_LIST = ({ page_no, limit, ledger, parent_transaction, lending }) => ({
  url: `/lendings`,
  method: 'get',
});
export const GET_LENDINGS_DETAILS = ({ id }) => ({ url: `/lendings/${id}`, method: 'get' });
