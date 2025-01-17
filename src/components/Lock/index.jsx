import { Grid, Container, Paper, Fab } from '@mui/material';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Backdrop from '@mui/material/Backdrop';
import { LockContextConsumer, LockContext } from '../../context/LockContext';
import useInput from '../../hooks/useInput';
import useAPICall from '../../hooks/useAPICall';
import { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const MAX_PIN_LENGTH = 4;
const LAST_ROW = ['R', 0, 'D'];

export default function Lock() {
	const isMobile = window.innerWidth < 640;

	const { loginStatus } = useContext(UserContext);
	const { setLock } = useContext(LockContext);
	// eslint-disable-next-line
	const [pin, bindPin, pinValidation, resetPin] = useInput('');
	const { APIRequest } = useAPICall();

	useEffect(() => {
		setLock(false);
		// setLock(loginStatus);
	}, [loginStatus, setLock]);

	return (
		<LockContextConsumer>
			{({ lock, setLock }) => {
				const validatePin = async pin => {
					try {
						await APIRequest('VALIDATE_USER_PIN', { pin });
						setLock(false);
						resetPin();
					} catch (e) {
						if (e.type === 2 && e.code === '30026') {
							resetPin();
						}
					}
				};

				const handleClickNumber = e => {
					const v = e.target.value;
					if (isNaN(v)) {
						if (v === 'R') resetPin();
						else if (v === 'D') bindPin.onChange({ target: { value: pin.slice(0, -1) } });
					} else {
						if (pin.length === 4) {
							return;
						}
						bindPin.onChange({ target: { value: pin + v } });
						if ((pin + v).length === 4) {
							validatePin(pin + v);
						}
					}
				};

				return (
					<div>
						<Backdrop
							component='div'
							sx={{
								height: '100vh',
								zIndex: theme => 1100,
								backgroundImage: `url('${isMobile ? '' : ''}')`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								bgcolor: 'secondary.main',
								display: 'flex',
								alignItems: 'top',
								overflow: 'hidden',
								position: 'fixed',
							}}
							open={lock}
						>
							<Container
								component='main'
								maxWidth='xl'
								sx={{
									mt: 1,
									p: 2,
								}}
							>
								<Grid container direction='row' justifyContent={'flex-end'} alignItems={'center'}>
									<Grid item xs={12} sm={12} md={8} lg={4} xl={4}>
										<Paper
											elevation={5}
											sx={{
												m: 1,
												p: 2,
												alignItems: 'center',
												display: 'flex',
												flexDirection: 'column',
											}}
											variant='lock-screen'
										>
											<Grid container maxWidth={'sm'} sx={{ textAlign: 'center', m: 1 }} rowSpacing={1} direction={'column'}>
												<Grid container sx={{ m: 0, p: 0, spacing: '0px' }} direction='row'>
													{Array.apply(0, Array(MAX_PIN_LENGTH)).map((_, i) => (
														<Grid key={i} item xs={3} md={3} sm={3} xl={3} lg={3}>
															{i < pin.length ? (
																<Brightness1Icon sx={{ height: 50, width: 50 }} />
															) : (
																<Brightness1OutlinedIcon sx={{ height: 50, width: 50 }} />
															)}
														</Grid>
													))}
												</Grid>
												<Grid container columnSpacing={0} rowSpacing={2.5} direction='row' sx={{ mt: 2, pt: 4, alignItems: 'center' }}>
													{Array.apply(0, Array(9)).map((_, i) => (
														<Grid key={i} item xs={4} md={4} sm={4} xl={4} lg={4}>
															<Fab
																sx={{ height: 85, width: 85 }}
																onClick={handleClickNumber}
																value={i + 1}
																label={i + 1}
																color='secondary'
																variant='extended'
																elevation={24}
															>
																{i + 1}
															</Fab>
														</Grid>
													))}
													{LAST_ROW.map((v, i) => {
														return (
															<Grid key={i} item xs={4} md={4} sm={4} xl={4} lg={4}>
																<Fab
																	sx={{ height: 85, width: 85 }}
																	onClick={handleClickNumber}
																	value={v}
																	label={v}
																	aria-label={v === 0 ? 'Zero' : v === 'R' ? 'Reset' : 'Backspace'}
																	color='secondary'
																	variant='extended'
																>
																	{v}
																</Fab>
															</Grid>
														);
													})}
												</Grid>
											</Grid>
										</Paper>
									</Grid>
								</Grid>
							</Container>
						</Backdrop>
					</div>
				);
			}}
		</LockContextConsumer>
	);
}
