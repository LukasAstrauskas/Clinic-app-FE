import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';
import PastAppointments from './PastAppointmets';
import UpcomingAppointments from './UpcomingApppointments';
import TabPanel from '../../components/TabPanel';

const PatientAppointments = () => {
  const [value, setValue] = useState(0);

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

  return (
    <>
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
