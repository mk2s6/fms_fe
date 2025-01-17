import React, { Fragment, Suspense, useContext, useEffect, useState } from 'react';

import App from './App';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from './commons/theme';

import { ThemeContext } from './context/ThemeContext.jsx';
import { CssBaseline } from '@mui/material';

export function Body() {
	const { currentTheme } = useContext(ThemeContext);

	const [T, setT] = useState(createTheme(themeOptions[3]));

	useEffect(() => {
		currentTheme && setT(createTheme(currentTheme));
		if (currentTheme) {
			window.document.body.style.backgroundColor = currentTheme.palette.background.default;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTheme]);

	return (
		<>
			<ThemeProvider theme={T}>
				<CssBaseline enableColorScheme={true} />
				<Suspense fallback={<Fragment>Loading...</Fragment>}>
					<App
						sx={{
							m: 0,
							p: 0,
							...(currentTheme && { backgroundColor: currentTheme.palette.background.default }),
						}}
					/>
				</Suspense>
			</ThemeProvider>
		</>
	);
}
