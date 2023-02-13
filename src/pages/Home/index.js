import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
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
                    <Card sx={{ height: 100 }} variant='elevation' elevation={16}>
                      {/** neon blue: 0FF0FC */}
                      {/* <CardActionArea> */}
                      <CardContent>
                        <Typography sx={{ fontSize: 14, textTransform: 'uppercase' }} color='text.primary' gutterBottom>
                          {elem.label}
                        </Typography>
                      </CardContent>
                      {/* </CardActionArea> */}
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
