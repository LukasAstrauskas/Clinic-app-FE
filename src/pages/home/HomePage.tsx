import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import styles from './WelcomePage.module.css';
import Item from './Item';
import mannageApointmentIcon from '../../assets/manage-appointments-icon.svg';
import physicianTimetablesIcon from '../../assets/physician-timetables-icon.svg';
import manageUsersIcon from '../../assets/manage-users-icon.svg';
import managePhysiciansIcon from '../../assets/manage-physicians-icon.svg';
import newAppointmentIcon from '../../assets/new-appointment-icon.svg';
import { ROUTES } from '../../routes/routes';
import { useAppSelector } from '../../store/hooks';
import {
  selectIsUserLoaded,
  selectLoggedUserType,
} from '../../store/slices/loggedUser/loggedUserSlice';

const HomePage = () => {
  const loggedUserType = useAppSelector(selectLoggedUserType);
  const isUserLoaded = useAppSelector(selectIsUserLoaded);

  // useEffect()[]

  return (
    <Grid
      className={styles.main}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      {loggedUserType == 'admin' && (
        <>
          <Item
            title='Manage users'
            icon1={manageUsersIcon}
            icon2={managePhysiciansIcon}
            linkTo={ROUTES.MANAGEUSERS}
          ></Item>
          <Item
            title='Manage timeslots'
            icon1={physicianTimetablesIcon}
            linkTo={ROUTES.MANAGETIMESLOTS}
          ></Item>
        </>
      )}

      <Item
        title='Book appointment'
        icon1={mannageApointmentIcon}
        linkTo={ROUTES.BOOKAPPOINTMENT}
      ></Item>

      {loggedUserType == 'patient' && (
        <Item
          title='Your appointments'
          icon1={newAppointmentIcon}
          linkTo={ROUTES.PATIENTAPPOINTMENTS}
        ></Item>
      )}
    </Grid>
  );
};

export default HomePage;
