import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Patients } from '../../pages/patients/Patients';
import { Physicians } from '../../pages/physicians/Physicians';
import { Admins } from '../../pages/admins/Admins';

const Tabs = () => {
  const [patients, setPatients] = useState<boolean>(false);
  const [physicians, setPhysicians] = useState<boolean>(false);
  const [admins, setAdmins] = useState<boolean>(false);
  const ButtonStyle = {
    width: 130,
    fontWeight: 700,
    borderRadius: '0px',
    color: '#5A5A5A',
    borderBottom: '3px solid transparent',
    '&:hover': {
      borderBottom: '3px solid #28cdcb',
      color: '#28cdcb',
      backgroundColor: 'white',
    },
  };

  const ClickedButtonStyle = {
    width: 130,
    fontWeight: 700,
    borderBottom: '3px solid #28cdcb',
    color: '#28cdcb',
    borderRadius: '0px',
    backgroundColor: 'white',
  };

  const TabStyle = {
    marginTop: 10,
    backgroundColor: 'lightgrey',
    height: '41px',
  };

  const openPatients = () => {
    setPatients(true);
    setPhysicians(false);
    setAdmins(false);
  };

  const openPhysicians = () => {
    setPatients(false);
    setPhysicians(true);
    setAdmins(false);
  };
  const openAdmins = () => {
    setPatients(false);
    setPhysicians(false);
    setAdmins(true);
  };
  return (
    <>
      <Box sx={TabStyle}>
        <Button
          onClick={openPatients}
          sx={patients ? ClickedButtonStyle : ButtonStyle}
        >
          Patients
        </Button>
        <Button
          onClick={openPhysicians}
          sx={physicians ? ClickedButtonStyle : ButtonStyle}
        >
          Physicians
        </Button>
        <Button
          onClick={openAdmins}
          sx={admins ? ClickedButtonStyle : ButtonStyle}
        >
          Admins
        </Button>
      </Box>

      {patients && <Patients />}
      {physicians && <Physicians />}
      {admins && <Admins />}
    </>
  );
};

export default Tabs;
