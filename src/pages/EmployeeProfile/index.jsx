import { Container } from '@mui/material';
import useAPICall from '../../hooks/useAPICall';
import { useEffect, useState, useContext } from 'react';
import UserDetails from '../../components/UserDetails';
import Transition from '../../components/System/Transition';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Profile() {
  const { APIRequest } = useAPICall();
  const { loginStatus } = useContext(UserContext);
  const { id } = useParams();

  const [details, setDetails] = useState();

  const getEmployeeProfileDetails = async () => {
    try {
      const { data } = loginStatus && (await APIRequest('USER_PROFILE'));
      setDetails(data[0]);
      return data[0];
    } catch (e) {
    }
  };

  useEffect(() => {
    getEmployeeProfileDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Transition>
        <Container component='main' maxWidth='md' sx={{ mt: 1, p: 2 }}>
          {details && <UserDetails details={details} self={true} />}
        </Container>
      </Transition>
    </>
  );
}

export default Profile;
