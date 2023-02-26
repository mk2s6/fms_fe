import { Card, CardActions, CardContent, Grid, Tooltip, Typography } from '@mui/material';
import { Btn } from '../System/Inputs';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { useState } from 'react';

export default function PaymentMethodCard({ data, actions, ...props }) {
  const [paymentMethod] = useState(data || {});

  return (
    <Grid item key={paymentMethod.id} xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
      <Card sx={{ minHeight: 100 }} color='secondary' variant='elevation' elevation={20}>
        <CardContent sx={{ pb: 0.5 }}>
          <Typography variant='Body2' sx={{ fontSize: '20px' }} gutterBottom color='text.primary'>
            {paymentMethod.name}
          </Typography>
          <Grid container spacing={1} sx={{ mt: 0.1 }}>
            <Grid component={Typography} color='text.disabled' item>
              <Tooltip arrow title={paymentMethod.active ? 'Active' : 'In-Active'}>
                {paymentMethod.active ? <ToggleOnTwoToneIcon sx={{ fontSize: '28px' }} /> : <ToggleOffTwoToneIcon sx={{ fontSize: '28px' }} />}
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mt: 0.1, justifyContent: { xs: 'start', sm: 'start', md: 'end' } }}>
          {actions.map(action => (
            <Btn key={action.key} type='small' onClick={action.action(paymentMethod)} {...action.props}>
              <Tooltip title={action.toolTip}>{action.icon}</Tooltip>
            </Btn>
          ))}
        </CardActions>
      </Card>
    </Grid>
  );
}
