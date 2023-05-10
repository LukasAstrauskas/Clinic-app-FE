import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMorePastPatientAppointments,
  selectPastAppointments,
  selectPatientPastAppointmentAmount,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import AppointmentSlot from './AppointmentSlot';
import { PatientAppointments } from '../../model/Model';

const PastAppointments = () => {
  const appointments = useSelector(selectPastAppointments);
  const appointmentAmount = useSelector(selectPatientPastAppointmentAmount);
  const [more, setMore] = useState(false);
  const userId = sessionStorage.getItem('userId');
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
        style={{
          height: 600,
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
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

export default PastAppointments;
