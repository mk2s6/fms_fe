import Backdrop from '@mui/material/Backdrop';
import { LoaderContextConsumer } from '../../context/LoaderContext';
import LoadingComponent from '../System/LoadingComponent';

export default function Loader() {
	return (
		<LoaderContextConsumer>
			{({ loader, setLoader }) => {
				const handleClose = () => {
					setTimeout(() => setLoader(false), 2000);
				};

				return (
					<div>
						<Backdrop sx={{ color: '#000', zIndex: theme => 1600, backgroundColor: 'rgba(50,50,50,0.9)' }} open={loader} onClick={handleClose}>
							<LoadingComponent />
						</Backdrop>
					</div>
				);
			}}
		</LoaderContextConsumer>
	);
}
