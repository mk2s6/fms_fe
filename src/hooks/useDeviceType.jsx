import { useState, useEffect } from 'react';

const useDeviceType = () => {
	const [isMobile, setIsMobile] = useState(false);

	const checkDeviceType = () => {
		const isMobile = window.innerWidth <= 768;
		setIsMobile(isMobile);
	};

	useEffect(() => {
		checkDeviceType();

		window.addEventListener('resize', checkDeviceType);

		return () => {
			window.removeEventListener('resize', checkDeviceType);
		};
	}, []);

	return isMobile;
};

export default useDeviceType;
