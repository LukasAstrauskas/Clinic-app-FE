import {
  Box,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchPastPatientAppointments,
  fetchPatientAppointments,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import UpcomingAppointments from './UpcomingApppointments';
import PastAppointments from './PastAppointmets';

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

  type TabPanelProps = {
    value: number;
    index: number;
    children: JSX.Element;
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
    return (
      <div>
        {value === index && <Typography variant='h1'>{children} </Typography>}
      </div>
    );
  }

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
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
