import React from 'react';
import { Grid } from '@mui/material';
import styles from './HomePage.module.css';
import Item from './Item';
import bookAppointment from '../../assets/book-appointment.svg';
import manageTimeslots from '../../assets/manage-timeslots.svg';
import manageUsers from '../../assets/manage-users.svg';
import appointments from '../../assets/appointments.svg';
import { ROUTES } from '../../routes/routes';
import { useAppSelector } from '../../store/hooks';
import { selectLoggedUserType } from '../../store/slices/loggedUser/loggedUserSlice';

const HomePage = () => {
  const loggedUserType = useAppSelector(selectLoggedUserType);

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
            icon={manageUsers}
            linkTo={ROUTES.MANAGEUSERS}
          ></Item>
          <Item
            title='Manage timeslots'
            icon={manageTimeslots}
            linkTo={ROUTES.MANAGETIMESLOTS}
          ></Item>
        </>
      )}

      <Item
        title='Book appointment'
        icon={bookAppointment}
        linkTo={ROUTES.BOOKAPPOINTMENT}
      ></Item>

      {loggedUserType == 'patient' && (
        <Item
          title='Your appointments'
          icon={appointments}
          linkTo={ROUTES.PATIENTAPPOINTMENTS}
        ></Item>
      )}
    </Grid>
  );
};

export default HomePage;
