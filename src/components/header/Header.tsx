import React, { useState } from 'react';
import styles from './Header.module.css';
import medClinic from '../../assets/med-clinic.svg';
import { Avatar, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { logout } from '../../store/slices/loggedUser/loggedUserSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetStore } from '../../store/reducers';
import {
  selectIsLogged,
  selectLoggedUser,
} from '../../store/slices/loggedUser/loggedUserSlice';
import { PAGENEAME } from '../../utils/Constants';

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
    <div className={styles.header}>
      <NavLink to={ROUTES.HOMEPAGE} className={styles.headerLogoLink}>
        <div className={styles.headerLogoSection}>
          <img
            src={medClinic}
            alt='clinic-logo'
            className={styles.clinicLogo}
          />
          <h1>{PAGENEAME}</h1>
        </div>
      </NavLink>
      <Stack direction='row' spacing={2}>
        {isLogged && (
          <IconButton onClick={handleClickAvatar} disableRipple>
            <Avatar className={styles.avatar} sx={{ bgcolor: grey[100] }}>
              <div className={styles.avatarLogo}>{loggedUser.initials}</div>
            </Avatar>
          </IconButton>
        )}
      </Stack>
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
    </div>
  );
};

export default Header;
