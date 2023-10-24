import { Card, CardActions, CardContent, Grid, Tooltip, Typography } from '@mui/material';
import { Btn } from '../System/Inputs';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import AutoFixOffTwoToneIcon from '@mui/icons-material/AutoFixOffTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import CloudOffTwoToneIcon from '@mui/icons-material/CloudOffTwoTone';
import CloudDoneTwoToneIcon from '@mui/icons-material/CloudDoneTwoTone';
import { shortWeekDay } from '../../utils/dates';

export default function CategoryCard({ category, actions, ...props }) {
  return (
    <Grid item key={category.id} xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
      <Card sx={{ minHeight: 100 }} color='secondary' variant='elevation' elevation={20}>
        <CardContent sx={{ pb: 0.5 }}>
          <Typography variant='Body2' sx={{ fontSize: '20px' }} gutterBottom color='text.primary'>
            {category.name}
          </Typography>
          <Grid container spacing={1} sx={{ mt: 0.1 }}>
            <Grid component={Typography} variant='button' color='text.disabled' xs={12} item>
              {category?.availableDays?.map(day => shortWeekDay(day.label)?.toUpperCase()).join(' - ')}
            </Grid>
            <Grid component={Typography} color='text.disabled' item>
              <Tooltip arrow title={category.isActive ? 'Active' : 'In-Active'}>
                {category.isActive ? <ToggleOnTwoToneIcon sx={{ fontSize: '28px' }} /> : <ToggleOffTwoToneIcon sx={{ fontSize: '28px' }} />}
              </Tooltip>
            </Grid>
            <Grid component={Typography} color='text.disabled' item>
              <Tooltip arrow title={category.isAvailable ? 'Available to Order' : 'Not Available to Order'}>
                {category.isAvailable ? <EventAvailableTwoToneIcon sx={{ fontSize: '28px' }} /> : <EventBusyTwoToneIcon sx={{ fontSize: '28px' }} />}
              </Tooltip>
            </Grid>
            <Grid component={Typography} color='text.disabled' item>
              <Tooltip arrow title={category.isSpecial ? 'Special' : 'Not Special'}>
                {category.isSpecial ? <AutoFixHighTwoToneIcon sx={{ fontSize: '28px' }} /> : <AutoFixOffTwoToneIcon sx={{ fontSize: '28px' }} />}
              </Tooltip>
            </Grid>
            <Grid component={Typography} color='text.disabled' item>
              <Tooltip arrow title={category.isAvailableOnline ? 'Available Online' : 'Not Available Online'}>
                {category.isAvailableOnline ? <CloudDoneTwoToneIcon sx={{ fontSize: '28px' }} /> : <CloudOffTwoToneIcon sx={{ fontSize: '28px' }} />}
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mt: 0.1, justifyContent: { xs: 'start', sm: 'start', md: 'end' } }}>
          {actions.map(action => (
            <Btn key={action.key} type='small' onClick={action.action(category)} {...action.props}>
              <Tooltip title={action.toolTip}>{action.icon}</Tooltip>
            </Btn>
          ))}
        </CardActions>
      </Card>
    </Grid>
  );
}
