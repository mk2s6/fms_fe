import { Card, CardActions, CardContent, Grid, Tooltip, Typography } from '@mui/material';
import { Btn } from '../System/Inputs';

export default function MenuTypeCard({ type, actions, ...props }) {
  return (
    <Grid item key={type.id} xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
      <Card sx={{ minHeight: 100 }} color='secondary' variant='elevation' elevation={20}>
        <CardContent sx={{ pb: 0.5 }}>
          <Typography variant='Body2' sx={{ fontSize: '20px' }} gutterBottom color='text.primary'>
            {type.type}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 0.1, justifyContent: { xs: 'start', sm: 'start', md: 'end' } }}>
          {actions.map(action => (
            <Btn key={action.key} type='small' onClick={action.action(type)} {...action.props}>
              <Tooltip title={action.toolTip}>{action.icon}</Tooltip>
            </Btn>
          ))}
        </CardActions>
      </Card>
    </Grid>
  );
}
