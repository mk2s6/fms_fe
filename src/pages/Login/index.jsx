import { Avatar, Container, Grid, Paper, Checkbox, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import useAPICall from '../../hooks/useAPICall';
import useInput from '../../hooks/useInput';
import useValidations from '../../hooks/useValidations';
import { Btn, TextBox } from '../../components/System/Inputs';
import { validateString } from '../../utils/validations';

function Login() {
  const [username, bindUsername, usernameValidation] = useInput('', null, 'Please provide Email, Mobile or Username to login.!', validateString(3));
  const [password, bindPassword, passwordValidation] = useInput('', null, 'Please provide a valid Password.', validateString(8));
  const [rememberMe, bindRememberMe, rememberMeValidation] = useInput(false, 2);
  const { APIRequest } = useAPICall();
  const { setValidations } = useValidations();
  const { registerUser } = useContext(UserContext);

  const validationFields = {
    username: usernameValidation,
    password: passwordValidation,
    rememberMe: rememberMeValidation,
  };

  const submitLogin = async () => {
    try {
      const {
				data: [user],
				token,
			} = await APIRequest('USER_LOGIN', { username, password, rememberMe });

			registerUser({ user, token });
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
            <LockOutlined />
          </Avatar>
          <Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
            Sign In
          </Typography>
          <div sx={{ width: '100%', m: 3 }} autoComplete='nope'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextBox required {...bindUsername} id='Username' label='Username' name='name' />
              </Grid>
              <Grid item xs={12}>
                <TextBox required {...bindPassword} label='Password' type='password' id='pw' name='password' />
              </Grid>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography component={'label'} gutterBottom>
                  <Checkbox name='remember me' color='primary' {...bindRememberMe} error={''} aria-label='Remember Me.' />
                  Remember Me.
                </Typography>
              </Grid>
            </Grid>
            <Btn fullWidth type='submit' onClick={submitLogin} label='Sign In' />
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
