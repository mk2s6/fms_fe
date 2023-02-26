import { AddCircleTwoTone, DownloadForOfflineTwoTone, UploadFileTwoTone } from '@mui/icons-material';
import { Container, ListItem, MenuItem, Pagination, Paper, Select, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import useAPICall from '../../hooks/useAPICall';
import SpeedDialInput from '../System/SpeedDialInput';
import TransactionListItem from './TransactionListItem';

const rowsPerPageConfig = [1, 5, 10, 15, 20, 25, 50, 100];

export default function TransactionsList({ API, filters, currentPage, ...props }) {
  const [data, setData] = useState([]);
  const [page_no, setCurrentPage] = useState(currentPage || 1);
  const [limit, setLimit] = useState(rowsPerPageConfig[1]);
  const [totalPages, setTotalPages] = useState(0);
  const { APIRequest } = useAPICall();

  const toolTopActions = [
    {
      key: 'Add',
      icon: <AddCircleTwoTone />,
      toolTip: 'Add Transactions',
      action: () => {
        // setClickType('CREATE');
      },
    },
    {
      key: 'bulk-upload',
      icon: <UploadFileTwoTone />,
      toolTip: 'Bulk add transactions',
      action: () => {
        // setClickType('BULK_CREATE');
        alert('This feature is coming soon..!!');
      },
    },
    {
      key: 'bulk-create-sample',
      icon: <DownloadForOfflineTwoTone />,
      toolTip: 'Bulk Create - sample',
      action: () => {
        alert('This feature is coming soon..!!');
      },
    },
  ];

  const getDataRows = async (page_no, limit) => {
    try {
      const { data } = await APIRequest(API, { page_no, limit });
      setData(data.items);
      setTotalPages(data.totalPages);
      return data.items;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      currentPage && (await getDataRows(currentPage || 1, limit));
    })();
  });

  useEffect(() => {
    (async () => {
      const rows = await getDataRows(page_no, limit);
      rows.length === 0 && setCurrentPage(1);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_no, limit]);

  const handlePageChange = (e, v) => {
    setCurrentPage(v);
  };

  const handleLimitChange = e => {
    setLimit(e.target.value);
  };

  return (
    <>
      <Container component={Box} maxWidth='xl' sx={{ mt: 1, p: 0.5 }} disableGutters>
        {!!data && data.length > 0 && (
          <Box component={Paper} sx={{ minWidth: '100%' }} justifyContent='center'>
            <Stack sx={{ width: '100%' }} direction={'column'} alignItems='center'>
              {data.map(row => (
                <TransactionListItem key={row.id} data={row} />
              ))}
            </Stack>
            <Stack>
              <Stack
                sx={{ width: '100%' }}
                justifyContent='center'
                alignItems={'center'}
                direction={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
              >
                <ListItem sx={{ display: '-webkit-box', '-webkit-box-pack': { xs: 'center', sm: 'center', md: 'end' } }}>
                  Rows:
                  <Select sx={{ ml: 1 }} size='small' id='limit-change' value={limit} onChange={handleLimitChange} autoWidth dense>
                    {rowsPerPageConfig.map(L => (
                      <MenuItem value={L}>{L}</MenuItem>
                    ))}
                  </Select>
                </ListItem>
                <ListItem sx={{ display: '-webkit-box', '-webkit-box-pack': { xs: 'center', sm: 'center', md: 'start' } }}>
                  <Pagination
                    boundaryCount={2}
                    variant='outlined'
                    shape='rounded'
                    page={page_no}
                    defaultPage={page_no}
                    onChange={handlePageChange}
                    count={totalPages}
                  />
                </ListItem>
              </Stack>
            </Stack>
          </Box>
        )}
        {data.legth === 0 && (
          <Stack component={Paper} justifyContent='center' alignItems={'center'} direction={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}>
            <ListItem sx={{ display: '-webkit-box', '-webkit-box-pack': 'center' }}>
              Rows:
              <Select sx={{ ml: 1 }} size='small' id='limit-change' value={limit} onChange={handleLimitChange} autoWidth dense>
                {rowsPerPageConfig.map(L => (
                  <MenuItem value={L}>{L}</MenuItem>
                ))}
              </Select>
            </ListItem>
          </Stack>
        )}
      </Container>
      <SpeedDialInput actions={toolTopActions} ariaLabel='Create Options - Add a Transaction' />
    </>
  );
}
