import { Avatar, Grid, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import { formatDisplayDate } from '../../commons/dates';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import { getCurrencyForListFormat } from '../../utils';

const Amount = styled(Typography)(({ theme, type }) => {
  if (['CREDIT', 'CASHBACK', 'REFUND'].includes(type)) {
    return {
      color: theme.palette.success.main,
    };
  } else if (['DEBIT', 'CHARGES'].includes(type)) {
    return {
      color: theme.palette.error.main,
    };
  } else if (['IN-VALID'].includes(type)) {
    return {
      color: theme.palette.warning.main,
      textDecoration: 'line-through',
    };
  } else {
    return {};
  }
});

export default function TransactionListItem({ data }) {
  const [openDetails, setOpenDetails] = useState(false);

  const toggleDetails = () => {
    setOpenDetails(!openDetails);
  };

  return (
    <>
      <TransactionDetails id={data.id} open={openDetails} toggle={toggleDetails} />

      <ListItemButton
        sx={{
          width: { xs: '100%', sm: '100%', md: '80%', xl: '80%', lg: '80%' },
        }}
        onClick={() => {
          toggleDetails();
        }}
      >
        <ListItemAvatar alignItems="flex-start">
          <Avatar>
            <ReceiptLongIcon />
          </Avatar>
        </ListItemAvatar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <ListItemText primary={data.purpose} secondary={formatDisplayDate(data.date)} />
          </Grid>

          <Grid item xs={4} sm={4} md={2} sx={{
            display: "flex", alignItems: 'center'
          }}>
            <Typography>{data.mode}</Typography>
          </Grid>

          <Grid item xs={4} sm={4} md={2} sx={{ display: "flex", alignItems: 'center' }}>
            <Typography>{data.category}</Typography>
          </Grid>

          <Grid item xs={4} sm={4} md={2} sx={{ display: "flex", alignItems: 'center' }}>
            <Typography >
              <Amount variant='button' type={data.type}>
                {getCurrencyForListFormat(data.value, data.type, data.currencyCode)}
              </Amount>
            </Typography>
          </Grid>

        </Grid>
      </ListItemButton >
    </>
  );
}
