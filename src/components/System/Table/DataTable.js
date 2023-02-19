import useAPICall from '../../../hooks/useAPICall';
import { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ tableColumns, API, dataTotalRows, dataProperty, ...props }) {
  const { APIRequest } = useAPICall();
  const [rows, setRows] = useState([]);
  const [columns] = useState(tableColumns);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const getDataRows = async (page_no, limit) => {
    try {
      const { data } = await APIRequest(API, { page_no, limit });
      setRows(data[dataProperty]);
      setTotalRows(data[dataTotalRows]);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   try {
  //     tableColumns && setColumns(tableColumns);
  //     tableColumns && getDataRows(page + 1, rowsPerPage);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    tableColumns && getDataRows(page + 1, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  return (
    <DataGrid
      sx={{ minHeight: { xs: 450, sm: 450, md: 450, lg: 450, xl: 450 }, borderColor: 'primary.main' }}
      isCellEditable={() => false}
      isRowSelectable={() => false}
      rows={rows}
      sortingMode='server'
      columns={columns}
      disableColumnFilter
      disableColumnMenu
      disableColumnResize={false}
      paginationMode='server'
      rowsPerPageOptions={[5, 10, 15, 20, 25]}
      onPageSizeChange={newPage => setRowsPerPage(newPage)}
      pageSize={rowsPerPage}
      onPageChange={page => setPage(page)}
      rowCount={totalRows}
      disableSelectionOnClick
      {...props}
    />
  );
}
