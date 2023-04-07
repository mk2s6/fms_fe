import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { Suspense, useContext } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../components/System/Transition';
import { RoutesContext } from '../../context/RoutesContext';

function Home() {
	const { homeRoutes } = useContext(RoutesContext);

	return (
		<>
			<Suspense fallback='Loading...'>
				<Transition>
					<Container maxWidth={false} sx={{ mt: 2, maxWidth: '85%' }}>
						{homeRoutes && (
							<Grid container justifyContent='center' spacing={2} sx={{ mt: 2, p: 1, flexGrow: 1 }}>
								{homeRoutes.map(elem => (
									<Grid item key={elem.id} xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none' component={Link} to={elem.route}>
										<Card sx={{ minHeight: 80, p: 1, pl: 2, pt: 2, height: 100 }} color='secondary' variant='elevation' elevation={20}>
											<CardHeader
												sx={{ p: 0 }}
												title={elem.label}
												titleTypographyProps={{ variant: 'h6', sx: { fontSize: '18px', mb: 0, pb: 0 }, gutterBottom: false, color: 'text.primary' }}
												subheader={`${elem.description}`}
												subheaderTypographyProps={{
													sx: { fontSize: '11px', mb: 0, pb: 0 },
													gutterBottom: true,
													color: 'text.disabled',
												}}
											/>
										</Card>
									</Grid>
								))}
							</Grid>
						)}
					</Container>
				</Transition>
			</Suspense>
		</>
	);
}

export default Home;
