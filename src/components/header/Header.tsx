import React, { useState } from 'react';
import styles from './Header.module.css';
import clinicLogo from '../../assets/clinic-logo.svg';
import { Avatar, Button, Menu, MenuItem, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { logout } from '../../store/slices/auth/authActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetStore } from '../../store/reducers';
import {
  selectIsLogged,
  selectLoggedUser,
} from '../../store/slices/loggedUser/loggedUserSlice';

const Header = () => {
  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navige = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();

  const loggedUser = useAppSelector(selectLoggedUser);
  const isLogged = useAppSelector(selectIsLogged);

  return (
    <div className={styles.header}>
      <NavLink to={ROUTES.HOMEPAGE} className={styles.headerLogoLink}>
        <div className={styles.headerLogoSection}>
          <img
            src={clinicLogo}
            alt='clinic-logo'
            className={styles.clinicLogo}
          />
          <h1>G-Unit Clinic</h1>
        </div>
      </NavLink>
      <Stack direction='row' spacing={2}>
        <div>
          {isLogged && (
            <>
              <Button onClick={handleClickAvatar}>
                <Avatar className={styles.avatar} sx={{ bgcolor: grey[100] }}>
                  <div className={styles.avatarLogo}>{loggedUser.initials}</div>
                </Avatar>
              </Button>
              <Menu
                open={openMenu}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
              >
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
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    dispatch(logout());
                    dispatch(resetStore());
                  }}
                >
                  Log-out
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Stack>
    </div>
  );
};

export default Header;
