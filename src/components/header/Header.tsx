import React from 'react';
import styles from './Header.module.css';
import classnames from 'classnames';
import clinicLogo from '../../assets/clinic-logo.svg';
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const resolveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classnames({
      [styles.menuItem]: !isActive,
      [styles.menuItemActive]: isActive,
    });
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={styles.header}>
      <Link to={ROUTES.HOME} className={styles.headerLogoLink}>
        <div className={styles.headerLogoSection}>
          <img
            src={clinicLogo}
            alt='clinic-logo'
            className={styles.clinicLogo}
          />
          <h1>The Clinic</h1>
        </div>
      </Link>

      <Stack direction='row' spacing={2}>
        <div>
          <Button
            ref={anchorRef}
            id='composition-button'
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
          >
            {/* add validation to check if the user is logged in */}
            <Avatar className={styles.avatar} sx={{ bgcolor: grey[100] }}>
              <div className={styles.avatarLogo}>
                {/* implement avatar symbols logic */}
                AA
              </div>
            </Avatar>
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement='bottom-start'
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left bottom' : 'left top',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='composition-menu'
                      aria-labelledby='composition-button'
                      onKeyDown={handleListKeyDown}
                    >
                      {/* add link to user profile */}
                      <NavLink to='/profile' className={resolveLinkClass}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </NavLink>
                      <NavLink to={ROUTES.LOGIN} className={resolveLinkClass}>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </NavLink>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    </div>
  );
};

export default Header;
