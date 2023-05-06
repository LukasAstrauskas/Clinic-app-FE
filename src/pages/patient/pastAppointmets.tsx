import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { selectId } from '../../store/slices/auth/authSlice';
import {
  fetchMorePastPatientAppointments,
  selectPastAppointments,
  selectPatientPastAppointmentAmount,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import AppointmentSlot from './appointment-slot';
import { PatientAppointments } from '../../model/Model';

const PastAppointmentsTab = () => {
  const appointments = useSelector(selectPastAppointments);
  const appointmentAmount = useSelector(selectPatientPastAppointmentAmount);
  const [more, setMore] = useState(false);
  const userId = useSelector(selectId);
  const dispatch = useDispatch<AppDispatch>();

  const fetchMoreAppointments = async () => {
    if (appointmentAmount > appointments.length) {
      await dispatch(
        fetchMorePastPatientAppointments({
          id: userId,
          offset: appointments.length,
        }),
      );
      setMore(true);
    } else {
      setMore(false);
    }
  };

  useEffect(() => {
    if (appointmentAmount > 0) {
      setMore(true);
    }
  }, []);

  return (
    <>
      <Box
        id='scrollBox'
        sx={{ maxHeight: 540 }}
        style={{
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          scrollableTarget='scrollBox'
          dataLength={appointments.length}
          next={fetchMoreAppointments}
          hasMore={more}
          loader={
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              loading...
            </Typography>
          }
        >
          {appointments.length != 0 ? (
            <>
              {appointments.map((appointment: PatientAppointments) => (
                <AppointmentSlot
                  key={appointment.physicianId}
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

export default PastAppointmentsTab;
