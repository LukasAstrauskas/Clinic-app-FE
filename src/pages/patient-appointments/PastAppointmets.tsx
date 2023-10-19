import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPatientPastAppointments,
  selectPastAppointments,
  selectTotalPastAppointmentAmount,
} from '../../store/slices/patient/patientSlice';
import AppointmentSlot from './AppointmentSlot';
import { PatientAppointment } from '../../model/Model';
import { selectLoggedUser } from '../../store/slices/auth/authSlice';
import { useAppDispatch } from '../../store/hooks';

const PastAppointments = () => {
  const appointments = useSelector(selectPastAppointments);
  const appointmentAmount = useSelector(selectTotalPastAppointmentAmount);
  // const [hasMore, setHasMore] = useState(false);
  const userId = useSelector(selectLoggedUser)?.id || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appointments.length === 0) {
      console.log('fetch PAST appointments');
      dispatch(fetchPatientPastAppointments({ id: userId, offset: 0 }));
    }
  }, []);

  const fetchMoreAppointments = async () => {
    console.log('fetch more apponits');
    await dispatch(
      fetchPatientPastAppointments({
        id: userId,
        offset: appointments.length,
      }),
    );
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
