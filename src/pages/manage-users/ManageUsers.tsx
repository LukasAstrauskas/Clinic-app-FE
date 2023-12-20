import React, { useState } from 'react';
import { Patients } from './Patients';
import { Physicians } from './Physicians';
import { Admins } from './Admins';
import { Tabs, Tab, createTheme, Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import TabPanel from '../../components/TabPanel';
import ManagePatients from './ManagePatients';
import ManagePhysicians from './ManagePhysicians';
import ManageAdmins from './ManageAdmins';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#25ced1',
    },
  },
});

const ManageUsers = () => {
  const [value, setValue] = useState(0);

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Manage Users</h2>
      <ThemeProvider theme={theme}>
        <Box sx={{ marginBottom: '20px' }}>
          <Tabs
            value={value}
            onChange={handleTabs}
            textColor='secondary'
            indicatorColor='secondary'
            style={{
              border: 2,
              backgroundColor: '#f4f4f4',
              borderRadius: '5px',
              padding: 1,
            }}
            sx={{
              '& button:focus': { backgroundColor: 'white' },
            }}
          >
            <Tab label='Patients' />
            {/* <Tab label='Physicians' /> */}
            <Tab label='Physicians' />
            <Tab label='Admins' />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <ManagePatients />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <Physicians />
        </TabPanel> */}
        <TabPanel value={value} index={1}>
          <ManagePhysicians />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ManageAdmins />
        </TabPanel>
      </ThemeProvider>
    </>
  );
};

export default ManageUsers;
