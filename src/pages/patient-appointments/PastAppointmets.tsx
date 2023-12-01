import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppointmentSlot from './AppointmentSlot';
import { PatientAppointment } from '../../model/Model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchPatientPastAppointmentAmount,
  selectPastAppointmentsAmount,
} from '../../store/slices/appointment/appointmentSlice';
import {
  fetchPatientPastAppointments,
  selectPastAppointments,
} from '../../store/slices/loggedUser/loggedUserSlice';

const PastAppointments = () => {
  const appointments = useAppSelector(selectPastAppointments);
  const appointmentAmount = useAppSelector(selectPastAppointmentsAmount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appointments.length === 0) {
      dispatch(fetchPatientPastAppointments(0));
      dispatch(fetchPatientPastAppointmentAmount());
    }
  }, []);

  const fetchMoreAppointments = async () => {
    await dispatch(fetchPatientPastAppointments(appointments.length));
  };

  const hasMore = () => appointmentAmount > appointments.length;

  return (
    <>
      <Box
        id='scrollBox'
        style={{
          height: 600,
          overflow: 'auto',
        }}
      >
        <Card sx={{ maxWidth: 150 }}>
          <CardContent>
            <Typography>Length rendered: {appointments.length}</Typography>
            <Typography>Length total: {appointmentAmount}</Typography>
          </CardContent>
        </Card>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          scrollableTarget='scrollBox'
          dataLength={appointments.length}
          next={fetchMoreAppointments}
          hasMore={hasMore()}
          loader={
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              loading...
            </Typography>
          }
          endMessage={
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              No more data to loaaad...
            </Typography>
          }
        >
          {appointments.length != 0 ? (
            <>
              {appointments.map((appointment: PatientAppointment) => (
                <AppointmentSlot
                  key={appointment.date}
                  appointment={appointment}
                />
              ))}
            </>
          ) : (
            <Typography
              variant='h5'
              textAlign={'center'}
              sx={{ marginTop: '60px' }}
              fontWeight={'bold'}
            >
              You have no past appointments
            </Typography>
          )}
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default PastAppointments;
