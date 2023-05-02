// import { Box, Button, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPatientAppointments,
  selectAppointments,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import moment from 'moment';
import { UniversalUser } from '../../model/Model';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  appointments: any;
}

const AppointmentSlot: FC<Props> = ({ appointments }) => {
  return (
    <>
      {appointments.map((appointment: any) => (
        <Box
          key={appointment.physicianId}
          sx={{
            marginTop: '40px',
            borderRadius: '20px',
            border: '1px solid black',
            height: '130px',
          }}
        >
          <Box
            sx={{
              padding: '20px',
              paddingX: '40px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ width: '330px' }}>
              <Typography fontWeight={'bold'} variant='h5'>
                Physician
              </Typography>
              <Typography sx={{ marginTop: '20px' }} fontWeight={'500'}>
                {appointment.physicianName}, {appointment.occupation.name}
              </Typography>
            </Box>
            <Box sx={{ marginLeft: '150px' }}>
              <Typography fontWeight={'bold'} variant='h5'>
                Date
              </Typography>
              <Typography sx={{ marginTop: '20px' }} fontWeight={'600'}>
                {moment(appointment.timeslot.date).format('Y-M-D ')}
                {moment(appointment.timeslot.date).format('h:mm')}
              </Typography>
            </Box>
            <Box>
              <Button
                variant='outlined'
                sx={{
                  marginLeft: '230px',
                  color: 'orange',
                  border: '1px solid orange !important',
                  fontWeight: '600',
                }}
              >
                CANCEL APPOINTMENT
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default AppointmentSlot;
