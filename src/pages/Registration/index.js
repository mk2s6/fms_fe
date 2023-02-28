import { Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import useAPICall from '../../hooks/useAPICall';
import useInput from '../../hooks/useInput';
import useValidations from '../../hooks/useValidations';
import { Btn, TextBox } from '../../components/System/Inputs';
import { checkErrors, validateString } from '../../utils/validations';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [username, bindUsername, usernameValidation] = useInput('', null, 'Please provide a Username to use for login.!', validateString(3));
  const [password, bindPassword, passwordValidation] = useInput('', null, 'Please provide a valid Password.', validateString(8));
  const [name, bindName, nameValidation] = useInput('', null, 'Please provide a valid Name.', validateString(3, 50));
  const [email, bindEmail, emailValidation] = useInput('', null, 'Please provide a valid Password.', validateString(8));
  const [mobile, bindMobile, mobileValidation] = useInput('', null, 'Please provide a valid Password.', validateString(8));
  const { APIRequest } = useAPICall();
  const { APIRequest: noNotificationAPI } = useAPICall(false, false);
  const { setValidations } = useValidations();
  const navigate = useNavigate();

  const inputFields = [bindUsername, bindPassword, bindName, bindEmail, bindMobile];

  const validationFields = {
    username: usernameValidation,
    password: passwordValidation,
    name: nameValidation,
    email: emailValidation,
    mobile: mobileValidation,
  };

  const validateUsernameAvailable = async () => {
    try {
      await noNotificationAPI('CHECK_USERNAME', { username }, false);
      return true;
    } catch (e) {
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
      return false;
    }
  };

  const submitRegistration = async () => {
    try {
      if (!(await checkErrors(inputFields)) && (await validateUsernameAvailable())) {
        await APIRequest('USER_REGISTER', { username, password, name, email, mobile });
        navigate('/signin');
      }
    } catch (e) {
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  return (
    <>
      <Container
        maxWidth='sm'
        component='form'
        onSubmit={e => {
          e.preventDefault();
        }}
        sx={{ mt: 3, p: 1 }}
      >
        <Paper component='div' elevation={5} sx={{ m: 0, p: 2, flexGrow: 1, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Avatar sx={{ m: 1, backgroundColor: 'primary.main' }}>
            <AppRegistrationTwoToneIcon />
          </Avatar>
          <Typography variant='h6' sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            Registration
          </Typography>
          <div sx={{ width: '100%', m: 3 }} component='form' autoComplete='off'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextBox required {...bindName} label='Full Name' id='name' name='name' />
              </Grid>
              <Grid item xs={12}>
                <TextBox required {...bindEmail} label='Email' id='email' name='Email' />
              </Grid>
              <Grid item xs={12}>
                <TextBox required {...bindMobile} label='Mobile' id='mobile' name='Mobile' />
              </Grid>
              <Grid item xs={6}>
                <TextBox required autocomplete='off' {...bindUsername} id='Username' label='Username' />
              </Grid>
              <Grid item xs={6}>
                <TextBox required autocomplete='off' {...bindPassword} label='Password' type='password' id='pw' />
              </Grid>
              <Grid item xs={12}>
                <Btn fullWidth type='submit' onClick={submitRegistration} label='Register' />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default Registration;
