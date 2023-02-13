import { Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { validateString } from '../../utils/validations';
import { Btn, TextBox } from '../System/Inputs';
import { useSnackbar } from 'notistack';
import useAPICall from '../../hooks/useAPICall';

export default function MenuTypeAddUpdateForm({ data, api, formItems, display, mode, setDisplay, label, ...props }) {
  const { enqueueSnackbar } = useSnackbar();
  const { APIRequest } = useAPICall(true);

  const [modal, setModal] = useState(display);
  const [name, bindName] = useInput('', null, 'Please provide a valid category of 3 to 50 characters.!', validateString(3, 50));

  const [catId, bindTypeId] = useInput(null, null);

  const disabledStatus = mode === 'VIEW';

  const checkErrors = () => {
    const fields = [bindName];

    return fields
      .map(_f => {
        _f.validate();
        return _f;
      })
      .map(_f => _f.error)
      .some(v => v === true);
  };

  const setDefaultData = () => {
    bindTypeId.setDefaultValue(data.id);
    bindName.setDefaultValue(data.type);
  };

  useEffect(() => {
    mode && (mode === 'UPDATE' || mode === 'VIEW') && setDefaultData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleModalClose = reload => () => {
    setModal(false);
    setDisplay('')(reload);
  };

  const submitAPI = async () => {
    if (checkErrors()) {
      enqueueSnackbar('Please Fix validation errors to proceed', {
        variant: 'warning',
      });
      return;
    }

    if (mode === 'VIEW') return;

    const reqData = {
      id: mode === 'UPDATE' ? catId : null,
      name,
    };
    try {
      await APIRequest(api, reqData);
      handleModalClose(true)();
    } catch (e) {}
  };

  return (
    <>
      <Dialog maxWidth='sm' fullWidth open={modal} onClose={handleModalClose(false)} TransitionComponent={Fade}>
        <form
          onSubmit={e => {
            e.preventDefault();
            submitAPI();
          }}
        >
          {mode !== 'BULK_CREATE' ? (
            <>
              <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Menu Type - {mode}</DialogTitle>
              <Divider sx={{ ml: 2, mr: 2 }} />
              <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={2} sx={{ p: 0.5 }}>
                  <Grid item xl={12}>
                    <TextBox fullWidth id='name' label='Type Name' type='text' value={name} {...bindName} required disabled={disabledStatus} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Btn onClick={handleModalClose(false)}>close</Btn>
                <Btn disabled={disabledStatus} onClick={submitAPI}>
                  {mode}
                </Btn>
              </DialogActions>
            </>
          ) : (
            <>
              <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Menu Type Bulk Upload</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To bulk upload menu types please download the template and update values in the template file and upload here.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Btn onClick={handleModalClose(false)}>close</Btn>
                <Btn>Upload</Btn>
              </DialogActions>
            </>
          )}
        </form>
      </Dialog>
    </>
  );
}
