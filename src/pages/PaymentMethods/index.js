/* eslint-disable react-hooks/exhaustive-deps */
import { AddCircleTwoTone, EditTwoTone, VisibilityTwoTone } from '@mui/icons-material';
import { Card, CardActions, CardContent, Container, Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PaymentMethodAddUpdateForm from '../../components/PaymentMethods/PaymentMethodAddUpdateForm';
import PaymentMethodCard from '../../components/PaymentMethods/PaymentMethodCard';
import { Btn } from '../../components/System/Inputs';
import SpeedDialInput from '../../components/System/SpeedDialInput';
import useAPICall from '../../hooks/useAPICall';

export default function PaymentMethods() {
  const [clickType, setClickType] = useState('');

  const { APIRequest } = useAPICall(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const getPaymentMethods = async () => {
    try {
      const { data } = await APIRequest('GET_PAYMENT_METHODS_LIST');
      setPaymentMethods(data);
    } catch (e) {}
  };

  const setDisplay =
    (to = '') =>
    async reload => {
      setClickType(to);
      reload && (await getPaymentMethods());
    };

  useEffect(() => {
    (async () => {
      await getPaymentMethods();
    })();
  }, []);

  const toolTopActions = [
    {
      key: 'CREATE',
      icon: <AddCircleTwoTone />,
      toolTip: 'Add Payment Method',
      action: () => {
        setClickType('CREATE');
      },
    },
  ];

  const handleUpdateRequest = type => data => () => {
    setUpdateData(data);
    setClickType(type);
  };

  const paymentMethodActions = [
    {
      key: 'VIEW',
      icon: <VisibilityTwoTone />,
      toolTip: 'View',
      action: handleUpdateRequest('VIEW'),
    },
    {
      key: 'UPDATE',
      icon: <EditTwoTone />,
      toolTip: 'Update',
      action: handleUpdateRequest('UPDATE'),
    },
  ];

  const APICalls = {
    CREATE: 'ADD_PAYMENT_METHOD',
    UPDATE: 'UPDATE_PAYMENT_METHOD',
    VIEW: '',
  };

  const api = () => APICalls[clickType];

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 0 }} component='main'>
        <Grid container justifyContent='center' spacing={2} sx={{ mt: 0.3, p: 1, flexGrow: 1 }}>
          {paymentMethods.length === 0 && (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
              <Card sx={{ minHeight: 100 }} color='secondary' variant='elevation' elevation={16}>
                <CardContent>
                  <Typography variant='button' color='text.primary'>
                    Payment Method - Add
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  {toolTopActions.map(action => (
                    <Btn key={action.key} type='small' onClick={action.action}>
                      <Tooltip title={action.toolTip}>{action.icon}</Tooltip>
                    </Btn>
                  ))}
                </CardActions>
              </Card>
            </Grid>
          )}

          {paymentMethods.length > 0 &&
            paymentMethods.map(pm => {
              return <PaymentMethodCard key={pm.id} actions={paymentMethodActions} data={pm} />;
            })}
        </Grid>

        {!!clickType && (
          <PaymentMethodAddUpdateForm
            data={updateData}
            api={api()}
            label={'Menu-Category-Add-Update-Form'}
            setDisplay={setDisplay}
            display={!!clickType}
            mode={clickType}
          />
        )}
      </Container>
      <SpeedDialInput actions={toolTopActions} ariaLabel='Create Payment Method' />
    </>
  );
}
