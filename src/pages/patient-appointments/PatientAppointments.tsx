import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPatientPastAppointmentAmount,
  fetchUpcomingPatientAppointments,
  selectPastAppointments,
  selectTotalPastAppointmentAmount,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import PastAppointments from './PastAppointmets';
import UpcomingAppointments from './UpcomingApppointments';
import TabPanel from '../../components/TabPanel';

const PatientAppointments = () => {
  const userId = sessionStorage.getItem('userId') || '';
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState(0);
  const pastAppointments = useSelector(selectPastAppointments);
  const appointmentAmount = useSelector(selectTotalPastAppointmentAmount);

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#25ced1',
      },
    },
  });

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  // useEffect(() => {
  //   console.log('fetch appointments');
  //   dispatch(fetchUpcomingPatientAppointments(userId));
  //   dispatch(fetchPatientPastAppointmentAmount(userId));
  // }, []);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Appointments</h2>
      <p>
        All: {appointmentAmount}, feched: {pastAppointments.length}
      </p>
      <ThemeProvider theme={theme}>
        <Box>
          <Tabs
            value={value}
            onChange={handleTabs}
            textColor='secondary'
            indicatorColor='secondary'
            style={{
              backgroundColor: '#f4f4f4',
              borderRadius: '5px',
              padding: 1,
            }}
            sx={{
              '& button:focus': { backgroundColor: 'white' },
            }}
          >
            <Tab label='Upcoming' sx={{ fontWeight: '400' }} />
            <Tab label='Past' sx={{ fontWeight: '400' }} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <UpcomingAppointments />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PastAppointments />
        </TabPanel>
      </ThemeProvider>
    </>
  );
};

export default PatientAppointments;
