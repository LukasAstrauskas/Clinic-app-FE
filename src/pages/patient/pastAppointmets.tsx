import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
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

const PastAppointmentsTab = () => {
  const appointments = useSelector(selectPastAppointments);
  const appointmentAmount = useSelector(selectPatientPastAppointmentAmount);
  const [more, setMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState<number>(
    appointments.length,
  );
  const userId = useSelector(selectId);
  const dispatch = useDispatch<AppDispatch>();

  if (appointments.length === 0) {
    setMore(false);
  }

  const fetchMoreAppointments = async () => {
    console.log('currentoffsetas', currentOffset);
    if (appointmentAmount > currentOffset) {
      await dispatch(
        fetchMorePastPatientAppointments({ id: userId, offset: currentOffset }),
      );
    } else {
      setMore(false);
    }
    setCurrentOffset(appointments.length);
  };

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
              {appointments.map((appointment: any) => (
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
