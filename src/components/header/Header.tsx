import React, { useState } from 'react';
import medClinic from '../../assets/med-clinic.svg';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { logout } from '../../store/slices/loggedUser/loggedUserSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetStore } from '../../store/reducers';
import {
  selectIsLogged,
  selectLoggedUser,
} from '../../store/slices/loggedUser/loggedUserSlice';
import { PAGENEAME, MAINGREEN } from '../../utils/Constants';

const Header = () => {
  const loggedUser = useAppSelector(selectLoggedUser);
  const isLogged = useAppSelector(selectIsLogged);
  const dispatch = useAppDispatch();
  const navige = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handelLogout = () => {
    handleCloseMenu();
    dispatch(logout());
    dispatch(resetStore());
  };

  return (
    <>
      <AppBar position='static' sx={{ background: 'white', boxShadow: 'none' }}>
        <Toolbar variant='dense'>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => navige(ROUTES.HOMEPAGE)}
          >
            <Avatar
              variant='rounded'
              src={medClinic}
              sx={{ width: 45, height: 45 }}
            />
          </IconButton>
          <Button variant='text' onClick={() => navige(ROUTES.HOMEPAGE)}>
            <Typography variant='h6' color='black' component='div'>
              <strong>{PAGENEAME}</strong>
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }}></Box>
          {isLogged && (
            <IconButton onClick={handleClickAvatar}>
              <Avatar sx={{ bgcolor: MAINGREEN }}>{loggedUser.initials}</Avatar>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleCloseMenu}>
        {loggedUser.type === 'patient' && (
          <MenuItem
            onClick={() => {
              navige(ROUTES.PATIENTPROFILE);
              handleCloseMenu();
            }}
          >
            Profile
          </MenuItem>
        )}
        <MenuItem onClick={handelLogout}>Log-out</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
