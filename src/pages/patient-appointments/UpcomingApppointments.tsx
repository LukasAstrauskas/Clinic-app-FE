import React from 'react';
import { Box, Typography } from '@mui/material';
import { PatientAppointment } from '../../model/Model';
import AppointmentSlot from './AppointmentSlot';
import { useAppSelector } from '../../store/hooks';
import { selectUpcomingAppointments } from '../../store/slices/loggedUser/loggedUserSlice';
const UpcomingAppointments = () => {
  const appointments = useAppSelector(selectUpcomingAppointments);

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
