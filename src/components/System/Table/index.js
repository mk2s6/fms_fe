import { Paper } from '@mui/material';
import DataTable from './DataTable';

function Table(props) {
  return (
    <>
      <Paper elevation={8} sx={{ width: '100%' }}>
        <DataTable {...props} />
      </Paper>
    </>
  );
}

export default Table;
