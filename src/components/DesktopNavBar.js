import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  faBookOpenReader,
  faScrewdriverWrench,
  faRightFromBracket,
  faPlugCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { useGlobalState } from '../context/stateContext';
import { SearchBar } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DesktopNavBar = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch({
      type: 'setLoggedInUser',
      data: null,
    });
    dispatch({
      type: 'setToken',
      data: null,
    });
    navigate('/');
  };

  return (
    <>
      <Typography className="logo" component={Link} to="/">
        iEV
      </Typography>
      <SearchBar />
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* Retrieve first */}
            <Avatar sx={{ width: 32, height: 32, background: '#d4a373' }}>
              A
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
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
        <MenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faBookOpenReader} />
          </ListItemIcon>
          Bookings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPlugCirclePlus} />
          </ListItemIcon>
          List A Charger
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </ListItemIcon>
          Edit Vehicle
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
