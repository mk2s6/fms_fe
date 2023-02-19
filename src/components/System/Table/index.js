import { Container, Paper } from '@mui/material';
import DataTable from './DataTable';

function Table(props) {
  return (
    <>
      <Container maxWidth='lg' sx={{ width: '80%' }}>
        <DataTable {...props} />
      </Container>
    </>
  );
}

export default Table;
