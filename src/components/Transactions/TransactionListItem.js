import { Avatar, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
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
        <ListItemAvatar>
          <Avatar>
            <ReceiptLongIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ width: '30%' }} primary={data.purpose} secondary={formatDisplayDate(data.date)} />
        <ListItemText primary={data.mode} sx={{ textAlign: 'center', width: '20%' }} />
        <ListItemText primary={data.category} sx={{ textAlign: 'center', width: '30%' }} />
        <ListItemText sx={{ textAlign: 'center', width: '20%' }}>
          <Amount variant='button' type={data.type}>
            {getCurrencyForListFormat(data.value, data.type, data.currencyCode)}
          </Amount>
        </ListItemText>
      </ListItemButton>
    </>
  );
}
