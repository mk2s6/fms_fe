export const themeOptions = [
	{
		mode: 'Light',
		name: 'Grass',
		id: 'THEME-GRASS-LIGHT',
		palette: {
			type: 'light',
			primary: {
				main: '#072100',
				light: '#d8e7cb',
				dark: '#131f0d',
				contrastText: '#d8e7cb',
			},
			secondary: {
				main: '#d8e7cb',
				dark: '#edfadf',
				contrastText: '#131f0d',
				light: '#131f0d',
			},
			text: {
				primary: '#072100',
				secondary: '#131f0d',
				default: '#edfadf',
				hint: '#131f0d',
				disabled: '#6C9491',
			},
			background: {
				default: '#AAC7B3',
				paper: '#d8e7cb',
			},
			divider: '#072100',
		},
		components: {
			MuiAppBar: {
				defaultProps: {
					color: 'secondary',
				},
			},
			MuiAvatar: {
				styleOverrides: {
					root: {
						fontSize: '1rem',
						backgroundColor: '#072100',
						color: '#d8e7cb',
					},
				},
			},
		},
		shape: {
			borderRadius: 18,
		},
		spacing: 8,
	},
	{
		mode: 'Light',
		name: 'Flower',
		id: 'THEME-FLOWER-LIGHT',
		palette: {
			type: 'light',
			primary: {
				main: '#40000a',
				light: '#ffdad9',
				dark: '#9c4146',
			},
			secondary: {
				main: '#ffdad9',
				contrastText: '#2c1515',
				light: '#ffdad9',
			},
			text: {
				primary: '#40000a',
				secondary: '#2c1515',
			},
			background: {
				default: '#ffeae9',
				paper: '#ffdad9',
			},
			divider: '#40000a',
		},
		props: {
			MuiAppBar: {
				color: 'secondary',
			},
			MuiCard: {
				color: 'secondary',
			},
		},
		components: {
			MuiAppBar: {
				defaultProps: {
					color: 'secondary',
				},
				styleOverrides: {
					root: {
						color: 'secondary',
					},
				},
			},
			MuiAvatar: {
				styleOverrides: {
					root: {
						fontSize: '1rem',
						backgroundColor: '#40000a',
						color: '#ffdad9',
					},
				},
			},
		},
		shape: {
			borderRadius: 18,
		},
		spacing: 8,
	},
	{
		mode: 'Dark',
		name: 'Night',
		id: 'THEME-NIGHT-DARK',
		palette: {
			type: 'dark',
			primary: {
				main: '#fff',
				light: '#fff',
				dark: '#acacac',
				contrastText: '#242424',
			},
			secondary: {
				main: '#383838',
				contrastText: '#ffffff',
				light: '#fff',
				dark: '#242424',
			},

			text: {
				primary: '#ffffff',
				secondary: '#ffffff',
				disabled: '#ACA9BB',
				default: '#ffffff',
				hint: '#eee',
			},
			background: {
				default: '#2A2A2A',
				paper: '#383838',
			},
			divider: '#fff',
		},
		props: {
			MuiAppBar: {
				color: 'secondary',
			},
		},
		components: {
			MuiAvatar: {
				styleOverrides: {
					root: {
						fontSize: '1rem',
						backgroundColor: '#ccc',
						color: '#121212',
					},
				},
			},
			MuiPaper: {
				variants: [
					{
						props: { variant: 'lock-screen' },
						style: {
							backgroundColor: '#202020',
						},
					},
				],
				styleOverrides: {
					root: {
						fontSize: '1rem',
					},
				},
			},
			MuiAppBar: {
				defaultProps: {
					color: 'secondary',
				},
				styleOverrides: {
					root: {
						color: 'primary',
					},
				},
			},
		},
		shape: {
			borderRadius: 18,
		},
		spacing: 8,
	},
	{
		mode: 'Dark',
		name: 'Space',
		id: 'THEME-SPACE-NIGHT',
		palette: {
			type: 'dark',
			primary: {
				main: '#A0A0A0',
				light: '#A0A0A0',
				dark: '#ccc',
				contrastText: '#242424',
			},
			secondary: {
				main: '#202020',
				contrastText: '#EFEFEF',
				light: '#242424',
				dark: '#242424',
			},

			text: {
				primary: '#ccc',
				secondary: '#ccc',
				default: '#ccc',
				disabled: '#545E65',
				hint: '#eee',
			},
			background: {
				default: '#3E4145',
				paper: '#202020',
			},
			divider: '#AFAFAF',
		},
		props: {
			MuiAppBar: {
				color: 'secondary',
			},
		},
		components: {
			MuiAvatar: {
				styleOverrides: {
					root: {
						fontSize: '1rem',
						backgroundColor: '#aaa',
						color: '#121212',
					},
				},
			},
			MuiPaper: {
				variants: [
					{
						props: { variant: 'lock-screen' },
						style: {
							backgroundColor: '#161616',
						},
					},
				],
				styleOverrides: {
					root: {
						fontSize: '1rem',
					},
				},
			},
			MuiAppBar: {
				defaultProps: {
					color: 'secondary',
				},
				styleOverrides: {
					root: {
						color: 'primary',
					},
				},
			},
		},
		shape: {
			borderRadius: 18,
		},
		spacing: 8,
	},
];
