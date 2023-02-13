import { Grid, Paper, Typography, Divider } from '@mui/material';
import { Btn, TextBox } from '../System/Inputs';
import useAPICall from '../../hooks/useAPICall';
import useValidations from '../../hooks/useValidations';
import useInput from '../../hooks/useInput';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function UserDetails({ details, self }) {
  const [editUserName, setEditUserName] = useState(false);
  const [username, bindUsername, usernameValidation] = useInput(details.username);
  const [pin, bindPin, pinValidation, resetPin] = useInput('');
  const [password, bindPassword, passwordValidation, resetPassword] = useInput('');
  const [updateType, setUpdateType] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);

  const { APIRequest } = useAPICall();
  const { setValidations } = useValidations();

  const validationFields = {
    username: usernameValidation,
    pin: pinValidation,
    password: passwordValidation,
  };

  const updateUsername = async () => {
    try {
      self && (await APIRequest('USER_USERNAME_UPDATE', { username }));
      setEditUserName(false);
    } catch (e) {
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
      if (e.code === '30024') usernameValidation(e);
    }
  };

  const handleUpdate = async () => {
    try {
      self && (updateType === 'PIN' ? await APIRequest('USER_PIN_UPDATE', { pin }) : await APIRequest('USER_PASSWORD_UPDATE', { password }));
      setUpdateType(0);
      setUpdateModal(false);
      updateType === 'PIN' ? resetPin() : resetPassword();
    } catch (e) {
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  const handleClose = () => {
    setUpdateModal(false);
  };

  const handleUpdateModal = type => {
    setUpdateType(type);
    setUpdateModal(true);
  };

  const validateInputs = e => {
    e?.preventDefault();
    try {
      if (updateType === 'PIN') {
        if (isNaN(pin)) return pinValidation({ message: 'Only numbers are allowed for a PIN.' });
        if (pin.length !== 4) return pinValidation({ message: 'PIN can only be 4 digit long.' });
      } else if (updateType === 'PASS') {
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/.test(password))
          return passwordValidation({ message: 'Password should contain One UpperCase, LoweCase, Number and Symbol, 8 Characters' });
      }
      handleUpdate();
    } catch (e) {
      resetPin();
      resetPassword();
    }
  };

  return (
    <>
      <Paper
        component='div'
        elevation={5}
        sx={{
          m: 1,
          p: 2,
          flexGrow: 1,
          mt: '10px',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Dialog sx={{ zIndex: 1000 }} maxWidth='sm' fullWidth open={updateModal} onClose={handleClose}>
          <form>
            <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Update {updateType === 'PIN' ? 'Pin' : 'Password'}</DialogTitle>
            <DialogContent>
              {updateType === 'PIN' ? (
                <TextBox
                  sx={{ mt: 1 }}
                  pattern='^[0-9]+'
                  autoFocus
                  type='password'
                  minLength={4}
                  maxLength={4}
                  id='outlined-basic'
                  label='Pin'
                  {...bindPin}
                  variant='outlined'
                />
              ) : (
                <TextBox
                  sx={{ mt: 1 }}
                  autoFocus
                  type='password'
                  minLength={8}
                  id='outlined-basic'
                  label='Password'
                  {...bindPassword}
                  variant='outlined'
                />
              )}
            </DialogContent>
            <DialogActions>
              <Btn sx={{ mt: 1 }} fullWidth label='cancel' onClick={handleClose}>
                Cancel
              </Btn>
              <Btn sx={{ mt: 1 }} type='submit' fullWidth label='update' onClick={validateInputs}>
                Update
              </Btn>
            </DialogActions>
          </form>
        </Dialog>
        <Grid sx={{ p: 1 }} container direction='column' spacing={2} rowSpacing={1} columnSpacing={2}>
          <Grid container direction='column' sx={{ flexGrow: 1, alignItems: 'center' }}>
            <Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
              Profile
            </Typography>
          </Grid>
          <Divider variant='fullwidth' sx={{ p: 0.5 }} />
          <Grid container direction='row' spacing={1} rowSpacing={2} sx={{ mt: 0.5, ml: 1, pt: 0.5, pl: 1 }}>
            <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
              <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
                Username
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              {!editUserName && (
                <>
                  <Typography variant='subtitle1'>{username}</Typography>
                </>
              )}
              {self && editUserName && (
                <>
                  <TextBox fullWidth id='outlined-basic' label='Username' {...bindUsername} variant='outlined' />
                  <Btn sx={{ mt: 1 }} onClick={updateUsername} fullWidth label={'Update'} />
                </>
              )}
            </Grid>
            <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
              <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
                {details.name}
              </Typography>
            </Grid>

            <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
              <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant='subtitle1' sx={{ textTransform: 'lowercase' }}>
                {details.email}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
              <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
                Phone
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
                {details.mobile}
              </Typography>
            </Grid>

            {self && (
              <>
                <Grid rowSpacing={0} item xs={6} sm={4} md={4} lg={4} xl={4}>
                  <Btn sx={{ mt: 1 }} fullWidth onClick={() => setEditUserName(true)} label={'Edit Username'} />
                </Grid>
                <Grid rowSpacing={0} item xs={6} sm={4} md={4} lg={4} xl={4}>
                  <Btn sx={{ mt: 1 }} fullWidth onClick={() => handleUpdateModal('PIN')} label={'Update PIN'} disabled />
                </Grid>
                <Grid rowSpacing={0} item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <Btn sx={{ mt: 1 }} fullWidth onClick={() => handleUpdateModal('PASS')} label={'Update Password'} />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default UserDetails;
