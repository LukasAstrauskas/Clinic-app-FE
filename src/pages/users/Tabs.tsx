import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Patients } from './Patients';
import { Physicians } from './Physicians';
import { Admins } from './Admins';
import { Tabs, Tab, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import TabPanel from './TabPanel';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#25ced1',
    },
  },
});

const UserTabs = () => {
  const [value, setValue] = useState(0);

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Manage Users</h2>
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
            <Tab label='Patients' />
            <Tab label='Physicians' />
            <Tab label='Admins' />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Patients />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Physicians />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Admins />
        </TabPanel>
      </ThemeProvider>
    </>
  );
};

export default UserTabs;
