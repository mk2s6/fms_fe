/* eslint-disable react/jsx-pascal-case */
import Home from '../pages/Home';
import Profile from '../pages/EmployeeProfile';
import Login from '../pages/Login';

import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import Registration from '../pages/Registration';
import Transactions from '../pages/Transactions';
import PaymentMethods from '../pages/PaymentMethods';
import _404 from '../pages/404';
import ComingSoon from '../pages/ComingSoon';
import Lendings from '../pages/Lendings';

export const MODULES = [
	{
		id: 1,
		code: 'MODREG',
		component: <Registration />,
		noAuth: true,
		in_nav: true,
		in_home: false,
		in_app_bar: true,
		title: false,
	},
	{
		id: 2,
		code: 'MODSIG',
		component: <Login />,
		noAuth: true,
		in_nav: true,
		in_home: false,
		in_app_bar: true,
		default: true,
		title: false,
	},
	{
		id: 3,
		code: 'MODHME',
		component: <Home />,
		noAuth: false,
		in_nav: true,
		in_home: false,
		in_app_bar: false,
		title: true,
		default: true,
	},
	{
		id: 4,
		code: 'MODTRN',
		component: <Transactions />,
		noAuth: false,
		in_nav: true,
		in_home: true,
		in_app_bar: false,
		menu_icon: <RestaurantTwoToneIcon fontSize='small' />,
	},
	{
		id: 5,
		code: 'MODLED',
		component: <ComingSoon />,
		noAuth: false,
		in_nav: true,
		in_home: true,
		in_app_bar: false,
	},
	{
		id: 6,
		code: 'MODDBD',
		component: <ComingSoon />,
		noAuth: false,
		in_nav: true,
		in_home: false,
		in_app_bar: false,
		menu_icon: <AccountCircleTwoToneIcon fontSize='small' />,
	},
	{
		id: 6,
		code: 'MODPRF',
		component: <Profile />,
		noAuth: false,
		in_nav: false,
		in_home: false,
		in_app_bar: true,
		menu_icon: <AccountCircleTwoToneIcon fontSize='small' />,
	},
	{
		id: 7,
		code: 'MODLGT',
		noAuth: false,
		component: <></>,
		in_nav: false,
		in_home: false,
		in_app_bar: true,
		menu_icon: <LogoutTwoToneIcon fontSize='small' />,
	},
	{
		id: 8,
		code: 'MODPYM',
		component: <PaymentMethods />,
		noAuth: false,
		in_nav: true,
		in_home: true,
		in_app_bar: false,
	},
	{
		id: 9,
		code: 'MODLEN',
		component: <Lendings />,
		noAuth: false,
		in_nav: true,
		in_home: true,
		in_app_bar: false,
	},
	{
		id: 10,
		code: 'MOD404',
		component: <_404 />,
		noAuth: false,
		in_nav: false,
		in_home: false,
		in_app_bar: false,
	},
];
