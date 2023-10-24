import { Container, Paper, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import BranchDetails from '../../components/BranchDetails';
import Transition from '../../components/System/Transition';
import { RestaurantContext } from '../../context/RestaurantContext';
import useAPICall from '../../hooks/useAPICall';

function Restaurant() {
  const { APIRequest } = useAPICall();
  const { details, currentBranch } = useContext(RestaurantContext);

  const [branchDetails, setBranchDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await APIRequest('BRANCH_DETAILS', { branch: currentBranch });
        setBranchDetails(data[0]);
      } catch (e) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBranch]);

  return (
    <>
      {details && (
        <Transition>
          <Container component='main' maxWidth='md' sx={{ mt: 1, p: 0.5 }}>
            <Paper
              component='div'
              elevation={5}
              sx={{ m: 1, p: 2, flexGrow: 1, mt: '10px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
                {details.name}
              </Typography>
              <Stack direction='row' spacing={2}>
                <Typography variant='body'>Phone: {details.mobile}</Typography>
                <Typography variant='body'>Email: {details.email}</Typography>
              </Stack>
            </Paper>
            {!!currentBranch && (
              <Paper component='div' elevation={5} sx={{ m: 1, p: 2, flexGrow: 1, mt: '10px' }}>
                {branchDetails && <BranchDetails details={branchDetails} />}
              </Paper>
            )}
          </Container>
        </Transition>
      )}
    </>
  );
}

export default Restaurant;
