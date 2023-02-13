import { Card, CardActions, CardContent, Container, Grid, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import { Btn } from '../../components/System/Inputs';
import SpeedDialInput from '../../components/System/SpeedDialInput';
import MenuCategoryAddUpdateForm from '../../components/MenuCategory';
import useAPICall from '../../hooks/useAPICall';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CategoryCard from '../../components/MenuCategory/categoryCard';
import { PermissionsContext } from '../../context/PermissionsContext';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

function Categories() {
  const [clickType, setClickType] = useState('');
  const { APIRequest } = useAPICall(false);
  const { permissions, getPermissions } = useContext(PermissionsContext);

  const [allCategories, setAllCategories] = useState([]);

  const [updateData, setUpdateData] = useState({});

  const setDisplay = to => async reload => {
    setClickType(to);
    reload && (await refreshCategoryData());
  };

  const refreshCategoryData = async () => {
    try {
      const { data } = await APIRequest('GET_CATEGORIES');
      setAllCategories(data);
    } catch (e) {}
  };

  const handleUpdateRequest = cat => () => {
    setUpdateData(cat);
    setClickType(permissions.category >= 2 ? 'UPDATE' : 'VIEW');
  };

  useEffect(() => {
    (async () => {
      await refreshCategoryData();
      await getPermissions();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryActions = [
    {
      key: permissions.category >= 2 ? 'update' : 'view',
      icon: permissions.category >= 2 ? <EditTwoToneIcon /> : <VisibilityTwoToneIcon />,
      toolTip: permissions.category >= 2 ? 'Update' : 'View',
      action: handleUpdateRequest,
    },
  ];

  const toolTopActions = [
    {
      key: 'create',
      icon: <AddCircleTwoToneIcon />,
      toolTip: 'Create',
      action: () => {
        setClickType('CREATE');
      },
      props: {
        disabled: !(permissions.category >= 3),
      },
    },
    {
      key: 'bulk-create',
      icon: <UploadFileTwoToneIcon />,
      toolTip: 'Bulk Create',
      action: () => {
        setClickType('BULK_CREATE');
        alert('This feature is coming soon..!!');
      },
      props: {
        disabled: !(permissions.category >= 3),
      },
    },
    {
      key: 'bulk-create-sample',
      icon: <DownloadForOfflineTwoToneIcon />,
      toolTip: 'Bulk Create - sample',
      action: () => {
        alert('This feature is coming soon..!!');
      },
      props: {
        disabled: !(permissions.category >= 3),
      },
    },
  ];

  const APICalls = {
    CREATE: 'ADD_MENU_CATEGORY',
    UPDATE: 'UPDATE_MENU_CATEGORY',
    VIEW: '',
  };

  const api = () => APICalls[clickType];

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 0 }} component='main'>
        <Grid container justifyContent='center' spacing={2} sx={{ mt: 0.3, p: 1, flexGrow: 1 }}>
          {allCategories.length === 0 && (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
              <Card sx={{ minHeight: 100 }} color='secondary' variant='elevation' elevation={16}>
                <CardContent>
                  <Typography variant='button' color='text.primary'>
                    Menu Category - Add
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  {toolTopActions.map(action => (
                    <Btn key={action.key} type='small' onClick={action.action}>
                      <Tooltip title={action.toolTip}>{action.icon}</Tooltip>
                    </Btn>
                  ))}
                </CardActions>
              </Card>
            </Grid>
          )}

          {allCategories.length > 0 &&
            allCategories.map(cat => {
              return <CategoryCard key={cat.id} actions={categoryActions} category={cat} />;
            })}
        </Grid>

        {!!clickType && (
          <MenuCategoryAddUpdateForm
            data={updateData}
            api={api()}
            label={'Menu-Category-Add-Update-Form'}
            setDisplay={setDisplay}
            display={!!clickType}
            mode={clickType}
          />
        )}
      </Container>
      {permissions.category >= 3 && (
        <SpeedDialInput actions={toolTopActions} disabled={!(permissions.category >= 3)} ariaLabel='Create Options - Menu Categories' />
      )}
    </>
  );
}

export default Categories;
