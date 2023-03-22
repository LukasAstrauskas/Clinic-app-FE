import { Grid } from '@mui/material';
import React from 'react';
import styles from './Content.module.css';
import Item from './Item';
import mannageApointmentIcon from '../../assets/manage-appointments-icon.svg';
import physicianTimetablesIcon from '../../assets/physician-timetables-icon.svg';
import manageUsersIcon from '../../assets/manage-users-icon.svg';
import managePhysiciansIcon from '../../assets/manage-physicians-icon.svg';

const Main = () => {
  return (
    <Grid
      className={styles.main}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Item
        title='Manage users'
        icon1={manageUsersIcon}
        icon2={managePhysiciansIcon}
      ></Item>
      <Item
        title='Physicians timetables'
        icon1={physicianTimetablesIcon}
      ></Item>
      <Item title='Manage appointments' icon1={mannageApointmentIcon}></Item>
    </Grid>
  );
};

export default Main;
