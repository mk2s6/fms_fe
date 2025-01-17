import { Card, CardHeader, Container, Grid2 } from '@mui/material';
import { Suspense, useContext } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../components/System/Transition';
import { RoutesContext } from '../../context/RoutesContext';

function Home() {
	try {
		const { homeRoutes } = useContext(RoutesContext);

		return (
			<>
				<Suspense fallback='Loading...'>
					<Transition>
						<Container maxWidth={'xl'}>
							{homeRoutes && (
								<Grid2 container justifyContent='center' spacing={2} sx={{ p: 1, flexGrow: 1 }} columns={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4 }}>
									{homeRoutes.map(elem => (
										<Grid2 key={elem.id} variant='button' size={1} component={Link} to={elem.route}>
											<Card sx={{ minHeight: 120, p: 1, pl: 2, pt: 2 }}>
												<CardHeader
													sx={{ p: 0 }}
													title={elem.label}
													titleTypographyProps={{ variant: 'h6', sx: { fontSize: '20px', mb: 0, pb: 0 }, gutterBottom: false, color: 'text.primary' }}
													subheader={`${elem.description}`}
													subheaderTypographyProps={{
														sx: { fontSize: '13px', mb: 0, pb: 0 },
														gutterBottom: true,
														color: 'text.disabled',
													}}
												/>
											</Card>
										</Grid2>
									))}
								</Grid2>
							)}
						</Container>
					</Transition>
				</Suspense>
			</>
		);
	} catch (e) {
		console.log(e);
	}
}

export default Home;
