import React from 'react';
import { Grid } from '@mui/material';
import styles from './WelcomePage.module.css';
import Item from './Item';
import mannageApointmentIcon from '../../assets/manage-appointments-icon.svg';
import physicianTimetablesIcon from '../../assets/physician-timetables-icon.svg';
import manageUsersIcon from '../../assets/manage-users-icon.svg';
import managePhysiciansIcon from '../../assets/manage-physicians-icon.svg';
import newAppointmentIcon from '../../assets/new-appointment-icon.svg';
import { ROUTES } from '../../routes/routes';
import { useSelector } from 'react-redux';
import { selectLoggedUserType } from '../../store/slices/auth/authSlice';

const WelcomePage = () => {
  const type = useSelector(selectLoggedUserType);

  return (
    <Grid
      className={styles.main}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      {type == 'admin' && (
        <>
          <Item
            title='Manage users'
            icon1={manageUsersIcon}
            icon2={managePhysiciansIcon}
            linkTo={ROUTES.USERS}
          ></Item>
          <Item
            title='Physicians timetables'
            icon1={physicianTimetablesIcon}
            linkTo={ROUTES.TIMETABLE}
          ></Item>
        </>
      )}

      <Item
        title='Book appointment'
        icon1={mannageApointmentIcon}
        linkTo={ROUTES.BOOKAPPOINTMENT}
      ></Item>

      {type == 'patient' && (
        <Item
          title='Manage appointments'
          icon1={newAppointmentIcon}
          linkTo={ROUTES.MANAGEAPPOINTMENTS}
        ></Item>
      )}
    </Grid>
  );
};

export default WelcomePage;
