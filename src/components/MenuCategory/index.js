import {
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  Switch,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { RestaurantSettingsContext } from '../../context/RestaurantSettingsContext';
import useInput from '../../hooks/useInput';
import { allWeekDays } from '../../utils/dates';
import { validateMultiSelectValues, validateString, validateTax } from '../../utils/validations';
import { Btn, TextBox } from '../System/Inputs';
import MultiSelectForm from '../System/Inputs/MultiSelectForm';
import { useSnackbar } from 'notistack';
import useAPICall from '../../hooks/useAPICall';

export default function MenuCategoryAddUpdateForm({ data, api, formItems, display, mode, setDisplay, label, ...props }) {
  const { enqueueSnackbar } = useSnackbar();
  const { APIRequest } = useAPICall(true);

  const [modal, setModal] = useState(display);
  const { settings } = useContext(RestaurantSettingsContext);
  const [name, bindName] = useInput('', null, 'Please provide a valid category of 3 to 50 characters.!', validateString(3, 50));
  const [tax, bindTax] = useInput(0, null, 'Please provide a value between 0 to 100.!', validateTax);
  const [categoryDays, bindCategoryDays] = useInput([], 4, 'Please choose at-least one category available day.!', validateMultiSelectValues(1, 7));
  const [categoryTimings, bindCategoryTimings] = useInput(
    [],
    4,
    'Please choose at-least one category available timing.!',
    validateMultiSelectValues(),
  );
  const [status, bindStatus] = useInput(false, 2);
  const [online, bindOnline] = useInput(false, 2);
  const [available, bindAvailable] = useInput(false, 2);
  const [special, bindSpecial] = useInput(false, 2);

  const [catId, bindCatId] = useInput(null, null);

  const disabledStatus = mode === 'VIEW';

  const checkErrors = () => {
    const fields = [bindName, bindTax, bindStatus, bindOnline, bindAvailable, bindSpecial, bindCategoryDays, bindCategoryTimings];

    return fields
      .map(_f => {
        _f.validate();
        return _f;
      })
      .map(_f => _f.error)
      .some(v => v === true);
  };

  const setDefaultData = () => {
    bindCatId.setDefaultValue(data.id);
    bindName.setDefaultValue(data.name);
    bindTax.setDefaultValue(data.tax);
    bindStatus.setDefaultValue(!!data.isActive);
    bindOnline.setDefaultValue(!!data.isAvailableOnline);
    bindAvailable.setDefaultValue(!!data.isAvailable);
    bindSpecial.setDefaultValue(!!data.isSpecial);
    bindCategoryDays.setDefaultValue(data.availableDays);
    bindCategoryTimings.setDefaultValue(data.availableTime.map(_t => ({ ..._t, label: _t.timingName, key: _t.id })));
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
      tax,
      availableDays: categoryDays.sort((a, b) => a.key - b.key),
      availableTime: categoryTimings.map(_t => _t.id),
      isActive: status,
      isSpecial: special,
      isAvailable: available,
      isAvailableOnline: online,
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
              <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Menu Category - {mode}</DialogTitle>
              <Divider sx={{ ml: 2, mr: 2 }} />
              <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={2} sx={{ p: 0.5 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextBox id='name' label='Category Name' type='text' value={name} {...bindName} required disabled={disabledStatus} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextBox id='tax' label='Category Special Tax' type='number' value={tax} {...bindTax} required disabled={disabledStatus} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <MultiSelectForm
                      id='categoryWeekDays'
                      label='Category Week Days'
                      value={categoryDays}
                      setValue={bindCategoryDays}
                      sortValues={true}
                      sortLabel={'key'}
                      fullWidth
                      required
                      disabled={disabledStatus}
                      requireAll={true}
                      denseMenu={false}
                      options={allWeekDays()}
                      name='Please choose at-least one week day or all'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <MultiSelectForm
                      id='categoryWeekDays'
                      label='Category Timings'
                      value={categoryTimings}
                      setValue={bindCategoryTimings}
                      fullWidth
                      required
                      disabled={disabledStatus}
                      requireAll={false}
                      denseMenu={false}
                      options={settings.timings.category.map(cat => ({ ...cat, label: cat.timingName, key: cat.id }))}
                      name='Please choose at-least one week day or all'
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FormControlLabel
                      disabled={disabledStatus}
                      labelPlacement={'bottom'}
                      control={<Switch checked={bindStatus.value} {...bindStatus} />}
                      label='Status'
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FormControlLabel
                      disabled={disabledStatus}
                      labelPlacement={'bottom'}
                      control={<Checkbox checked={bindAvailable.value} {...bindAvailable} />}
                      label='Available'
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FormControlLabel
                      disabled={disabledStatus}
                      labelPlacement={'bottom'}
                      control={<Checkbox checked={bindSpecial.value} {...bindSpecial} />}
                      label='Special'
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FormControlLabel
                      disabled={disabledStatus}
                      labelPlacement={'bottom'}
                      control={<Checkbox checked={bindOnline.value} {...bindOnline} />}
                      label='Online'
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Btn onClick={handleModalClose(false)}>close</Btn>
                <Btn type='submit' disabled={disabledStatus} onClick={submitAPI}>
                  {mode}
                </Btn>
              </DialogActions>
            </>
          ) : (
            <>
              <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Menu Category Bulk Upload</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To bulk upload categories please download the template and update values in the template file and upload here.
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
