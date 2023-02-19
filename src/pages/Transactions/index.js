import { Container, Paper, Typography } from '@mui/material';
import Table from '../../components/System/Table';
import Transition from '../../components/System/Transition';
import { formatDisplayDate } from '../../commons/dates';
import { Btn } from '../../components/System/Inputs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function Transactions() {
  const navigate = useNavigate();
  const { loginStatus, user } = useContext(UserContext);

  const tableColumns = [
    {
      id: 'date',
      field: 'transactionDate',
      numeric: false,
      type: 'string',
      headerName: 'Date',
      sortable: false,
      minWidth: 120,
      valueFormatter: ({ value }) => formatDisplayDate(value),
    },
    {
      id: 'Purpose',
      field: 'transactionPurpose',
      numeric: false,
      type: 'string',
      headerName: 'Purpose',
      sortable: false,
      minWidth: 200,
    },
    {
      id: 'type',
      field: 'transactionType',
      numeric: false,
      type: 'string',
      headerName: 'Type',
      sortable: false,
      minWidth: 120,
    },

    {
      id: 'amount',
      field: 'transactionValue',
      numeric: false,
      type: 'Amount',
      headerName: 'Amount',
      sortable: false,
      minWidth: 150,
    },
    {
      id: 'mode',
      field: 'transactionModes',
      numeric: false,
      type: 'string',
      headerName: 'Mode',
      sortable: false,
      minWidth: 120,
    },
  ];

  return (
    <>
      <Transition>
        <Container maxWidth='lg' sx={{ mt: 1, p: 2 }}>
          <Paper
            component='div'
            elevation={5}
            sx={{
              m: 1,
              p: 2,
              flexGrow: 1,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h6' sx={{ textTransform: 'uppercase' }} gutterBottom>
              Transactions LIST
            </Typography>
            {loginStatus && <Table API={'GET_TRANSACTIONS_LIST'} dataTotalRows={'totalItems'} dataProperty={'items'} tableColumns={tableColumns} />}
          </Paper>
        </Container>
      </Transition>
    </>
  );
}

export default Transactions;
