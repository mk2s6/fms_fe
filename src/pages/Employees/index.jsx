import { Container, Paper, Typography } from '@mui/material';
import Table from '../../components/System/Table';
import Transition from '../../components/System/Transition';
import { formatDate } from '../../commons/dates';
import { Btn } from '../../components/System/Inputs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function Employees() {
  const navigate = useNavigate();
  const { loginStatus, user } = useContext(UserContext);

  const employeeTableColumns = [
    {
      id: 'code',
      field: 'id',
      numeric: false,
      type: 'string',
      headerName: 'ID',
      sortable: false,
      minWidth: 100,
    },
    {
      id: 'role',
      field: 'role',
      numeric: false,
      type: 'string',
      headerName: 'Role',
      sortable: false,
      minWidth: 100,
    },
    {
      id: 'name',
      field: 'name',
      numeric: false,
      type: 'string',
      headerName: 'Name',
      sortable: false,
      minWidth: 100,
    },

    {
      id: 'phone',
      field: 'mobile',
      numeric: false,
      type: 'string',
      headerName: 'Phone',
      sortable: false,
      minWidth: 150,
    },
    {
      id: 'doj',
      field: 'doj',
      numeric: false,
      type: 'date',
      headerName: 'Joining Date',
      sortable: false,
      minWidth: 120,
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      id: 'email',
      field: 'email',
      numeric: false,
      type: 'string',
      headerName: 'Email',
      sortable: false,
      minWidth: 200,
    },
    {
      id: 'details',
      field: 'Get Details',
      headerName: 'Get Details',
      sortable: false,
      minWidth: 120,
      renderCell: params => {
        return <Btn label={'Details'} onClick={() => navigate(user.id === params.row.id ? '/employees/profile' : '/employees/' + params.row.id)} />;
      },
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
              Employees LIST
            </Typography>
            {loginStatus && (
              <Table API={'EMPLOYEES_LIST'} dataTotalRows={'totalNumberOfEmployees'} dataProperty={'employees'} tableColumns={employeeTableColumns} />
            )}
          </Paper>
        </Container>
      </Transition>
    </>
  );
}

export default Employees;
