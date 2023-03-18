import { Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Divider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { checkErrors, validatePaymentMethodTypes, validateString, validateTransactionCategories } from '../../utils/validations';
import { Btn, SelectDropDown, TextBox } from '../System/Inputs';
import { useSnackbar } from 'notistack';
import useAPICall from '../../hooks/useAPICall';
import useValidations from '../../hooks/useValidations';
import SwitchInput from '../System/Inputs/SwitchInput';
import { ApplicationContext } from '../../context/ApplicationContext';
import MultiSelectForm from '../System/Inputs/MultiSelectForm';

export default function TransactionsAddUpdateForm({ data, api, formItems, display, mode, setDisplay, label, ...props }) {
  const { enqueueSnackbar } = useSnackbar();
  const { setValidations } = useValidations();
  const { APIRequest } = useAPICall(true);

  const [modal, setModal] = useState(display);
  const { paymentMethods, transactionCategories, } = useContext(ApplicationContext);

  const [purpose, bindPurpose, purposeValidations] = useInput('', null, 'Please provide a valid transaction purpose.!', validateString(3, 50));
  const [description, bindDescription, descriptionValidations] = useInput(
    '',
    null,
    'Please provide a valid description for transaction.!',
    validateString(3, 250),
  );
  const [paymentMethod, bindPaymentMethod, paymentMethodValidations] = useInput(
    '',
    null,
    'Please provide a valid payment method type.!',
  );

  const [transactionCategory, bindTransactionCategory, transactionCategoryValidations] = useInput(
    [],
    4,
    'Please provide a valid payment method type.!',
    validateTransactionCategories,
  );


  const [active, bindActive, activeValidations] = useInput('', 2)

  const [pmId, bindPMId] = useState(null);

  const disabledStatus = mode === 'VIEW';

  const validationFields = {
    name: purposeValidations,
    type: paymentMethodValidations,
    active: activeValidations,
    description: descriptionValidations,
  };

  const setDefaultData = () => {
    bindPMId(data.id);
    bindPurpose.SetDefaultValue(data.name);
    bindPaymentMethod.SetDefaultValue(data.type);
    bindActive.SetDefaultValue(data.active);
  };

  const inputFields = [bindPurpose, bindPaymentMethod];

  useEffect(() => {
    mode && (mode === 'UPDATE' || mode === 'VIEW') && setDefaultData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleModalClose = reload => () => {
    setModal(false);
    setDisplay('')(reload && mode !== 'VIEW');
  };

  const submitAPI = async () => {
    if (checkErrors(inputFields)) {
      enqueueSnackbar('Please Fix validation errors to proceed.!', {
        variant: 'warning',
      });
      return;
    }

    if (mode === 'VIEW') return;

    const reqData = {
      id: mode === 'UPDATE' ? pmId : null,
      name: purpose,
      type: paymentMethod,
    };
    try {
      await APIRequest(api, reqData);
      await handleModalClose(true)();
    } catch (e) {
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
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

              <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={2} sx={{ p: 0.5 }}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextBox
                      id='purpose'
                      label='Transaction Purpose'
                      type='text'
                      value={purpose}
                      {...bindPurpose}
                      required
                      disabled={disabledStatus}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextBox
                      id='description'
                      label='Transaction Description'
                      type='textarea'
                      value={description}
                      {...bindDescription}
                      required
                      multiline
                      disabled={disabledStatus}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <SelectDropDown
                      id='paymentMethod'
                      label={'Payment Method'}
                      items={paymentMethods.map(I => ({ ...I, value: `${I.name}-${'X'.repeat(4)}${I.last4Digits}` }))}
                      value={paymentMethod}
                      required
                      disabled={disabledStatus}
                      readOnly={disabledStatus}
                      fullWidth
                      {...bindPaymentMethod}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <MultiSelectForm
                      id='transaction-category'
                      label='Transaction Categories'
                      readOnly={disabledStatus}
                      value={transactionCategory}
                      setValue={bindTransactionCategory}
                      fullWidth
                      required
                      disabled={disabledStatus}
                      requireAll={false}
                      denseMenu={false}
                      options={transactionCategories.map(cat => ({ key: cat, id: cat, value: cat, label: cat }))}
                      name='Please choose at-least one transaction category'
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Btn onClick={handleModalClose(true)}>close</Btn>
                <Btn type='submit' disabled={disabledStatus}>
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
