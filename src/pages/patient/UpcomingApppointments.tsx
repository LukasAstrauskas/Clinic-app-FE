import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { PatientAppointment } from '../../model/Model';
import AppointmentSlot from './AppointmentSlot';
import { selectLoggedUser } from '../../store/slices/auth/authSlice';
const UpcomingAppointments = () => {
  const loggedUser = useSelector(selectLoggedUser);
  const appointments = loggedUser?.upcomingAppointment || [];

  return (
    <>
      <Box
        sx={{ height: 600 }}
        style={{
          overflow: 'auto',
        }}
      >
        {appointments.length > 0 ? (
          <>
            {appointments.map((appointment: PatientAppointment) => (
              <AppointmentSlot
                key={appointment.id}
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
