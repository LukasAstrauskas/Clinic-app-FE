import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { PatientAppointments } from '../../model/Model';
import { selectAppointments } from '../../store/slices/patient/patientSlice';
import AppointmentSlot from './AppointmentSlot';
const UpcomingAppointments = () => {
  const appointments = useSelector(selectAppointments);

  return (
    <>
      <Box
        sx={{ height: 600 }}
        style={{
          overflow: 'auto',
        }}
      >
        {appointments.length != 0 ? (
          <>
            {appointments.map((appointment: PatientAppointments) => (
              <AppointmentSlot
                key={appointment.physicianId}
                appointment={appointment}
              ></AppointmentSlot>
            ))}
          </>
        ) : (
          <Typography
            variant='h5'
            textAlign={'center'}
            sx={{ marginTop: '60px' }}
            fontWeight={'bold'}
          >
            You have no upcoming appointments
          </Typography>
        )}
      </Box>
    </>
  );
};

export default UpcomingAppointments;
