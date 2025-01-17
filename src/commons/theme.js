import { light } from '@mui/material/styles/createPalette';

export const themeOptions = [
	// {
	// 	mode: 'Light',
	// 	name: 'Grass',
	// 	id: 'THEME-GRASS-LIGHT',
	// 	palette: {
	// 		mode: 'light',
	// 	},
	// },
	// {
	// 	mode: 'Dark',
	// 	name: 'Space',
	// 	id: 'THEME-SPACE-NIGHT',
	// 	palette: {
	// 		mode: 'dark',
	// 		primary: {
	// 			main: '#AAA',
	// 		},
	// 		secondary: {
	// 			main: '#fff',
	// 		},
	// 		background: {
	// 			default: '#000000',
	// 			paper: '#090909',
	// 		},
	// 	},
	// 	components: {
	// 		MuiAppBar: {
	// 			defaultProps: {
	// 				color: 'transparent',
	// 				enableColorOnDark: true,
	// 			},
	// 		},
	// 	},
	// },
	// {
	// 	mode: 'Light',
	// 	name: 'Grass',
	// 	id: 'THEME-GRASS-LIGHT',
	// 	palette: {
	// 		type: 'light',
	// 		primary: {
	// 			main: '#072100',
	// 			light: '#d8e7cb',
	// 			dark: '#131f0d',
	// 			contrastText: '#d8e7cb',
	// 		},
	// 		secondary: {
	// 			main: '#edfadf',
	// 			dark: '#d8e7cb',
	// 			contrastText: '#131f0d',
	// 			light: '#131f0d',
	// 		},
	// 		text: {
	// 			primary: '#072100',
	// 			secondary: '#131f0d',
	// 			default: '#edfadf',
	// 			hint: '#131f0d',
	// 			disabled: '#6C9491',
	// 		},
	// 		background: {
	// 			default: '#AAC7B3',
	// 			paper: '#d8e7cb',
	// 		},
	// 		divider: '#072100',
	// 	},
	// 	components: {
	// 		MuiAppBar: {
	// 			defaultProps: {
	// 				color: 'secondary',
	// 			},
	// 		},
	// 		MuiAvatar: {
	// 			styleOverrides: {
	// 				root: {
	// 					fontSize: '1rem',
	// 					backgroundColor: '#072100',
	// 					color: '#d8e7cb',
	// 				},
	// 			},
	// 		},
	// 	},
	// 	shape: {
	// 		borderRadius: 18,
	// 	},
	// 	spacing: 8,
	// },
	// {
	// 	mode: 'Dark',
	// 	name: 'Space',
	// 	id: 'THEME-SPACE-NIGHT',
	// 	palette: {
	// 		mode: 'dark',
	// 		primary: {
	// 			main: '#FFF',
	// 		},
	// 		secondary: {
	// 			main: '#ADADAD',
	// 		},
	// 		background: {
	// 			default: '#00000035',
	// 			paper: '#000',
	// 		},
	// 	},
	// 	components: {
	// 		MuiAvatar: {
	// 			styleOverrides: {
	// 				root: {
	// 					fontSize: '1rem',
	// 					backgroundColor: '#aaa',
	// 					color: '#121212',
	// 				},
	// 			},
	// 		},
	// 		MuiPaper: {
	// 			styleOverrides: {
	// 				root: {
	// 					fontSize: '1rem',
	// 					backgroundImage: 'none',
	// 					boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);',
	// 				},
	// 			},
	// 			variants: [
	// 				{
	// 					props: { variant: 'custom-paper' },
	// 					style: {
	// 						backgroundColor: '#000',
	// 					},
	// 				},
	// 			],
	// 		},
	// 		MuiAppBar: {
	// 			defaultProps: {
	// 				backgroundImage: 'none',
	// 			},
	// 		},
	// 	},
	// 	shape: {
	// 		borderRadius: 18,
	// 	},
	// 	spacing: 8,
	// },
	// {
	// 	mode: 'Light',
	// 	name: 'ivory',
	// 	id: 'THEME-IVORY-LIGHT',
	// 	palette: {
	// 		type: 'light',
	// 		primary: {
	// 			main: '#28282B',
	// 			light: '#F2EFDE',
	// 			dark: '#F0EAD6',
	// 			contrastText: '#28282B',
	// 		},
	// 		secondary: {
	// 			main: '#F0EAD6',
	// 			light: '#343434',
	// 			dark: '#FFF8DC',
	// 			contrastText: '#343434',
	// 		},
	// 		text: {
	// 			primary: '#28282B',
	// 			secondary: '#343434',
	// 			default: '#F0EAD6',
	// 			hint: '#343434',
	// 			disabled: '#36454F',
	// 		},
	// 		background: {
	// 			default: '#FFF8DC',
	// 			paper: '#F2EFDE',
	// 		},
	// 		divider: '#1B1212',
	// 	},
	// 	components: {
	// 		MuiAppBar: {
	// 			defaultProps: {
	// 				color: 'secondary',
	// 			},
	// 		},
	// 		MuiAvatar: {
	// 			styleOverrides: {
	// 				root: {
	// 					fontSize: '1rem',
	// 					backgroundColor: '#28282B',
	// 					color: '#FFFFF0',
	// 				},
	// 			},
	// 		},
	// 	},
	// 	shape: {
	// 		borderRadius: 18,
	// 	},
	// 	spacing: 8,
	// },
	{
		mode: 'Light',
		name: 'Purple',
		id: 'THEME-PURPLE',
		palette: {
			mode: 'light',
			primary: {
				main: '#64558f',
				light: '#E8DDFF',
				dark: '#201047',
				contrastText: '#E8DDFF',
			},
			secondary: {
				main: '#515B92',
				contrastText: '#ffffff',
				dark: '#0A164B',
			},
			background: {
				paper: '#E8DDFF',
				default: '#f5f5f5',
			},
			text: {
				primary: '#201047',
				secondary: '#1D192B',
				hint: '#4C3E76',
			},
			error: {
				main: '#BA1A1A',
			},
			info: {
				main: '#7D5261',
				light: '#FFD9E3',
				dark: '#31101E',
			},
			divider: '#4c3e76',
			success: {
				main: '#41682C',
			},
		},
		shape: {
			borderRadius: 16,
		},
		unstable_sxConfig: {},
		components: {
			MuiAvatar: {
				styleOverrides: {
					root: {
						fontSize: '1rem',
						backgroundColor: 'secondary',
						color: 'primary',
					},
				},
			},
			MuiPaper: {
				defaultProps: {
					variant: 'outlined',
				},
			},
		},
	},
	{
		mode: 'Dark',
		name: 'DarkPurple',
		id: 'THEME-PURPLE-DARK',
		palette: {
			mode: 'dark',
			primary: {
				main: '#CEBDFE',
				light: '#35275D',
				dark: '#CEBDFE',
				contrastText: '#4C3E75',
			},
			secondary: {
				main: '#515B92',
				contrastText: '#332D41',
				light: '#E8DEF8',
				dark: '#0A164B',
			},
			background: {
				paper: '#35275D',
				default: '#141218',
			},
			text: {
				primary: '#CEBDFE',
				secondary: '#1D192B',
				hint: '#E8DEF8',
			},
			error: {
				main: '#BA1A1A',
			},
			info: {
				main: '#7D5261',
				light: '#FFD9E3',
				dark: '#31101E',
			},
			divider: '#4c3e76',
			success: {
				main: '#41682C',
			},
		},
		shape: {
			borderRadius: 16,
		},
		unstable_sxConfig: {},
		components: {
			MuiAvatar: {
				styleOverrides: {
					root: {
						fontSize: '1rem',
						backgroundColor: 'secondary',
						color: 'primary',
					},
				},
			},
			MuiPaper: {
				defaultProps: {
					variant: 'outlined',
				},
			},
		},
	},
];
