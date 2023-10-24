import { useState, createContext, useEffect } from 'react';
import { themeOptions } from '../commons/theme';

export const ThemeContext = createContext({
	allThemes: themeOptions,
	setCurrentTheme: () => {},
	currentTheme: null,
});

export const ThemeContextProvider = props => {
	const [currentTheme, setCurrentTheme] = useState(null);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		themeOptions && storedTheme && setCurrentTheme(themeOptions.filter(T => T.id === storedTheme)[0] || themeOptions[0]);
		themeOptions && !storedTheme && setCurrentTheme(themeOptions[0]);
	}, []);

	useEffect(() => {
		currentTheme && localStorage.setItem('theme', currentTheme.id);
	}, [currentTheme]);

	return <ThemeContext.Provider value={{ themeOptions, currentTheme, setCurrentTheme }}>{props.children}</ThemeContext.Provider>;
};

export const ThemeContextConsumer = ThemeContext.Consumer;
