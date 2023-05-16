import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchPastPatientAppointments,
  fetchPatientAppointments,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import PastAppointments from './PastAppointmets';
import UpcomingAppointments from './UpcomingApppointments';
import TabPanel from '../users/TabPanel';
const AppointmentTabs = () => {
  const userId = sessionStorage.getItem('userId');
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState(0);

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#000000',
      },
    },
  });

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchPatientAppointments(userId));
    dispatch(fetchPastPatientAppointments(userId));
  }, []);

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
          <UpcomingAppointments />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PastAppointments />
        </TabPanel>
      </ThemeProvider>
    </>
  );
};

export default AppointmentTabs;
