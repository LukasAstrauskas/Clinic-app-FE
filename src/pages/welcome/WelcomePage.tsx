import React from 'react';
import { Grid } from '@mui/material';
import styles from './WelcomePage.module.css';
import Item from './Item';
import mannageApointmentIcon from '../../assets/manage-appointments-icon.svg';
import physicianTimetablesIcon from '../../assets/physician-timetables-icon.svg';
import manageUsersIcon from '../../assets/manage-users-icon.svg';
import managePhysiciansIcon from '../../assets/manage-physicians-icon.svg';

type WelcomePageProps = {
  role: string;
};

const WelcomePage = ({ role }: WelcomePageProps) => {
  return (
    <Grid
      className={styles.main}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      {role == 'admin' ? (
        <>
          <Item
            title='Manage users'
            icon1={manageUsersIcon}
            icon2={managePhysiciansIcon}
          ></Item>
          <Item
            title='Physicians timetables'
            icon1={physicianTimetablesIcon}
          ></Item>
        </>
      ) : (
        <Item title='New appointment' icon1={managePhysiciansIcon}></Item>
      )}
      <Item title='Manage appointments' icon1={mannageApointmentIcon}></Item>
    </Grid>
  );
};

export default WelcomePage;
