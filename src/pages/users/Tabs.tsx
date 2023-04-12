import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Patients } from './Patients';
import { Physicians } from './Physicians';
import { Admins } from './Admins';
import { Tabs, Tab } from '@mui/material';
import Typography from '@mui/material/Typography';
const UserTabs = () => {
  const [value, setValue] = useState(0);

  const handleTabs = (e: any, val: any) => {
    setValue(val);
  };

  function TabPanel(props: any) {
    const { children, value, index } = props;
    return (
      <div>
        {value === index && <Typography variant='h1'>{children} </Typography>}
      </div>
    );
  }

  return (
    <>
      <Box>
        <Tabs value={value} onChange={handleTabs}>
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
    </>
  );
};

export default UserTabs;
