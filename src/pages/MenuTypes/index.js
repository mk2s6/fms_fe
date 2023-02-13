import { Card, CardActions, CardContent, Container, Grid, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import { Btn } from '../../components/System/Inputs';
import SpeedDialInput from '../../components/System/SpeedDialInput';
import useAPICall from '../../hooks/useAPICall';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { PermissionsContext } from '../../context/PermissionsContext';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import MenuTypeCard from '../../components/MenuTypes/MenuTypeCard';
import MenuTypeAddUpdateForm from '../../components/MenuTypes';

function Types() {
  const [clickType, setClickType] = useState('');
  const { APIRequest } = useAPICall(false);
  const { permissions, getPermissions } = useContext(PermissionsContext);

  const [allTypes, setAllTypes] = useState([]);

  const [updateData, setUpdateData] = useState({});

  const setDisplay = to => async reload => {
    setClickType(to);
    reload && (await refreshMenuTypesData());
  };

  const refreshMenuTypesData = async () => {
    try {
      const { data } = await APIRequest('GET_MENU_TYPES');
      setAllTypes(data);
    } catch (e) {}
  };

  const handleUpdateRequest = cat => () => {
    setUpdateData(cat);
    setClickType(permissions.menu >= 2 ? 'UPDATE' : 'VIEW');
  };

  useEffect(() => {
    (async () => {
      await refreshMenuTypesData();
      await getPermissions();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuTypeActions = [
    {
      key: permissions.menu >= 2 ? 'update' : 'view',
      icon: permissions.menu >= 2 ? <EditTwoToneIcon /> : <VisibilityTwoToneIcon />,
      toolTip: permissions.menu >= 2 ? 'Update' : 'View',
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
        disabled: !(permissions.menu >= 3),
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
        disabled: !(permissions.menu >= 3),
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
        disabled: !(permissions.menu >= 3),
      },
    },
  ];

  const APICalls = {
    CREATE: 'ADD_MENU_TYPE',
    UPDATE: 'UPDATE_MENU_TYPE',
    VIEW: '',
  };

  const api = () => APICalls[clickType];

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 0 }} component='main'>
        <Grid container justifyContent='center' spacing={2} sx={{ mt: 0.3, p: 1, flexGrow: 1 }}>
          {allTypes.length === 0 && (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} variant='button' underline='none'>
              <Card sx={{ minHeight: 100 }} color='secondary' variant='elevation' elevation={16}>
                <CardContent>
                  <Typography variant='button' color='text.primary'>
                    Menu Type - Add
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

          {allTypes.length > 0 &&
            allTypes.map(type => {
              return <MenuTypeCard key={type.id} actions={menuTypeActions} type={type} />;
            })}
        </Grid>

        {!!clickType && (
          <MenuTypeAddUpdateForm
            data={updateData}
            api={api()}
            label={'Menu-Category-Add-Update-Form'}
            setDisplay={setDisplay}
            display={!!clickType}
            mode={clickType}
          />
        )}
      </Container>
      {permissions.menu >= 3 && (
        <SpeedDialInput actions={toolTopActions} disabled={!(permissions.menu >= 3)} ariaLabel='Create Options - Menu Types' />
      )}
    </>
  );
}

export default Types;
