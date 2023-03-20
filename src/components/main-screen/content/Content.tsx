import { Grid } from '@mui/material';
import React from 'react';
import '../MainScreen.css';
import Item from './Item';
import mannageApointment from '../../../assets/manage-appointments-icon.png';
import physicianTimetables from '../../../assets/physician-timetables.png';
import manageUsers from '../../../assets/manage-users.png';
import managePhysicians from '../../../assets/manage-physicians.png';

const Main = () => {
  return (
    <Grid
      className='main'
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Item
        title='Manage users'
        icon1={manageUsers}
        icon2={managePhysicians}
      ></Item>
      <Item title='Physicians timetables' icon1={physicianTimetables}></Item>
      <Item title='Manage appointments' icon1={mannageApointment}></Item>
    </Grid>
  );
};

export default Main;
