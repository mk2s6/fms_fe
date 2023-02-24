/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { Box, ListItemText, SwipeableDrawer, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { formatDisplayDate } from '../../commons/dates';
import useAPICall from '../../hooks/useAPICall';

export default function TransactionDetails({ id, open, toggle }) {
  const { APIRequest } = useAPICall();
  const [details, setDetails] = useState(null);

  const Puller = styled(Box)(({ theme }) => {
    return {
      width: 30,
      height: 10,
      backgroundColor: theme.palette.divider,
      borderRadius: 4,
      top: 8,
      left: 'calc(50% - 15px)',
    };
  });

  const getTransactionDetails = async () => {
    try {
      const { data } = await APIRequest('GET_TRANSACTION_DETAILS', { id });
      setDetails(data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    open &&
      (async () => {
        await getTransactionDetails();
      })();
  }, [open]);

  return (
    <>
      {open && details && (
        <SwipeableDrawer
          anchor={'bottom'}
          open={open}
          variant='temporary'
          hideBackdrop={false}
          onClose={toggle}
          elevation={24}
          ModalProps={{ sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
          PaperProps={{
            sx: {
              m: 'auto',
              pt: 1,
              pl: 2,
              pr: 2,
              pb: 5,
              width: { xs: '88%', sm: '88%', md: '85%', lg: '70%', xl: '70%' },
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
          }}
          SlideProps={{ transitionDuration: 1000, easing: { enter: 2500, exit: 2500 } }}
          transitionDuration={1000}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Puller />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={
                  <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold' }} variant='body1'>
                    Transaction Details
                  </Typography>
                }
                secondary={<Typography sx={{ fontSize: 14 }}>{formatDisplayDate(details.date)}</Typography>}
              />
            </Typography>
          </Box>
          <Box sx={{ minHeight: '300px' }}>
            <Typography variant='overline' sx={{ fontSize: 16 }}>
              Purpose:
            </Typography>
            <Typography variant='button' sx={{ fontSize: 20 }}>
              {details.purpose}
            </Typography>
          </Box>
        </SwipeableDrawer>
      )}
    </>
  );
}
