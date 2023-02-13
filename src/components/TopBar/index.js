import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import useAPICall from '../../hooks/useAPICall';
import { RoutesContext } from '../../context/RoutesContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ThemeContext } from '../../context/ThemeContext';
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';

function TopBar() {
  const { unRegisterUser, loginStatus, user } = useContext(UserContext);
  const { appBarRoutes, NoAuthAppBar, _default } = useContext(RoutesContext);
  const { themeOptions, setCurrentTheme, currentTheme } = useContext(ThemeContext);
  const { APIRequest } = useAPICall(false, true);

  const [anchorEl, setAnchorEl] = useState();

  const [accountMenu, setAccountMenu] = useState(false);
  const [themeMenu, setThemeMenu] = useState(accountMenu);

  const handleAccIcClick = flag => e => {
    setAccountMenu(flag);
    setAnchorEl(e.currentTarget);
  };

  const handleThemeButtonClick = flag => {
    setThemeMenu(flag);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          top: 0,
          left: 0,
          zIndex: 100,
          position: 'sticky',
        }}
      >
        <AppBar position='static' sx={{ height: 64, ...(loginStatus ? { boxShadow: 'none' } : {}) }}>
          <Toolbar>
            <Typography sx={{ textDecoration: 'none', fontSize: 20 }} color='inherit' component={Link} to={_default.route} variant={'button'}>
              PFTA
            </Typography>
            <Typography noWrap sx={{ flexGrow: 1 }} color='inherit'></Typography>
            {NoAuthAppBar &&
              NoAuthAppBar.length > 0 &&
              NoAuthAppBar.map(R => (
                <Button color='inherit' component={Link} to={R.route} key={R.id}>
                  {R.label}
                </Button>
              ))}

            {loginStatus && appBarRoutes && !!appBarRoutes.length && (
              <>
                <Tooltip title='Account'>
                  <IconButton
                    onClick={e => handleAccIcClick(true)(e)}
                    size='small'
                    aria-controls={accountMenu ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={accountMenu ? 'true' : undefined}
                  >
                    <Avatar
                      variant='rounded'
                      alt={user?.name
                        .split(' ')
                        .map(i => i[0])
                        .join('')
                        .slice(0, 2)}
                      sx={{ m: 0, bgColor: 'primary' }}
                      src={user?.img}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id='account-menu'
                  open={accountMenu}
                  onClose={e => {
                    handleThemeButtonClick(false);
                    handleAccIcClick(false)(e);
                    setAnchorEl(null);
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {appBarRoutes.map(r => (
                    <MenuItem
                      component={Link}
                      to={r.route}
                      key={r.id}
                      onClick={async () => {
                        setAccountMenu(false);
                        if (r.route === '/signout') {
                          await APIRequest('USER_LOGOUT', null, true);
                          unRegisterUser();
                          return;
                        }
                      }}
                    >
                      {r.menu_icon && <ListItemIcon sx={{ color: 'inherit' }}>{r.menu_icon}</ListItemIcon>}
                      {r.label}
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem onClick={() => handleThemeButtonClick(!themeMenu)}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <PaletteTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary='Theme' />
                    {themeMenu ? <ExpandLess /> : <ExpandMore />}
                  </MenuItem>
                  <Collapse in={themeMenu} timeout='auto' unmountOnExit>
                    <List disablePadding dense>
                      {themeOptions &&
                        themeOptions.length &&
                        themeOptions.map(T => (
                          <ListItemButton
                            sx={{ pl: 4 }}
                            key={T.id}
                            onClick={e => {
                              handleThemeButtonClick(false);
                              handleAccIcClick(false)(e);
                              setAnchorEl(null);

                              currentTheme.id !== T.id && setCurrentTheme(T);
                            }}
                          >
                            {T.mode === 'Light' ? <LightModeTwoToneIcon /> : <DarkModeTwoToneIcon />}
                            <ListItemText primary={T.name} sx={{ pl: 1 }} />
                          </ListItemButton>
                        ))}
                    </List>
                  </Collapse>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default TopBar;
