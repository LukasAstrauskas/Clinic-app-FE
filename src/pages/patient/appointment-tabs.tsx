import {
  Box,
  Button,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAppointment,
  fetchPastPatientAppointments,
  fetchPatientAppointments,
  selectAppointments,
  selectPastAppointments,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import moment from 'moment';
import AppointmentSlot from './appointment-slot';
import { PatientAppointments } from '../../model/Model';

const AppointmentTabs = () => {
  const upcomingAppointments = useSelector(selectAppointments);
  const pastAppointments = useSelector(selectPastAppointments);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState(0);

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#000000',
      },
    },
  });

  function TabPanel(props: any) {
    const { children, value, index } = props;
    return (
      <div>
        {value === index && <Typography variant='h1'>{children} </Typography>}
      </div>
    );
  }

  const handleTabs = (e: any, val: any) => {
    setValue(val);
  };

  useEffect(() => {
    dispatch(fetchPatientAppointments('52e2fc8e-d5b1-43e0-bde6-5dca5f96ced3'));
    dispatch(
      fetchPastPatientAppointments('52e2fc8e-d5b1-43e0-bde6-5dca5f96ced3'),
    );
  }, []);

  console.log(upcomingAppointments);
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Appointments</h2>
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
            <Tab label='Upcoming' sx={{ fontWeight: '600' }} />
            <Tab label='Past' sx={{ fontWeight: '600' }} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {upcomingAppointments.length ? (
            <AppointmentSlot appointments={upcomingAppointments} />
          ) : (
            <Typography
              variant='h5'
              textAlign={'center'}
              sx={{ marginTop: '60px' }}
              fontWeight={'bold'}
            >
              {' '}
              You have no upcoming appointments
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AppointmentSlot appointments={pastAppointments} />
        </TabPanel>
      </ThemeProvider>
    </>
  );
};

export default AppointmentTabs;
