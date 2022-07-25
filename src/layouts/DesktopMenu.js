import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  faBookOpenReader,
  faScrewdriverWrench,
  faRightFromBracket,
  faPlugCirclePlus,
  faUserPlus,
  faUser,
  faHouse,
  faPlugCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGlobalState } from "../context/stateContext";
export const DesktopMenu = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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
      type: "setLoggedInUser",
      data: null,
    });
    dispatch({
      type: "setToken",
      data: null,
    });
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* Retrieve first */}
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: "#faedcd",
                color: "#d4a373",
                boxShadow: "box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;",
              }}
            >
              {/* TODO; Update 'AT' with 'user.firstName.charAt[0] + user.lastName.charAt[0]' */}
              {loggedInUser ? "AT" : <FontAwesomeIcon icon={faUser} />}
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {loggedInUser ? (
          <div>
            {/* TODO: Add links to Bookings, List Charger, & Edit Vehicle */}
            <MenuItem component={Link} to="/">
              <ListItemIcon>
                <FontAwesomeIcon icon={faHouse} />
              </ListItemIcon>
              Home
            </MenuItem>

            <MenuItem component={Link} to="/">
              <ListItemIcon>
                <FontAwesomeIcon icon={faBookOpenReader} />
              </ListItemIcon>
              Bookings
            </MenuItem>

            <MenuItem component={Link} to="/chargers/mychargers">
              <ListItemIcon>
                <FontAwesomeIcon icon={faPlugCircleCheck} />
              </ListItemIcon>
              My Chargers
            </MenuItem>

            <MenuItem component={Link} to="/chargers/new">
              <ListItemIcon>
                <FontAwesomeIcon icon={faPlugCirclePlus} />
              </ListItemIcon>
              List A Charger
            </MenuItem>

            <MenuItem component={Link} to="/">
              <ListItemIcon>
                <FontAwesomeIcon icon={faScrewdriverWrench} />
              </ListItemIcon>
              Edit Vehicle
            </MenuItem>
            <Divider />

            <MenuItem component={Link} to="/" onClick={logout}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem component={Link} to="/">
              <ListItemIcon>
                <FontAwesomeIcon icon={faHouse} />
              </ListItemIcon>
              Home
            </MenuItem>

            <MenuItem component={Link} to="/auth/signup">
              <ListItemIcon>
                <FontAwesomeIcon icon={faUserPlus} />
              </ListItemIcon>
              Register
            </MenuItem>

            <MenuItem component={Link} to="/auth/signin">
              <ListItemIcon>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </ListItemIcon>
              Login
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};
