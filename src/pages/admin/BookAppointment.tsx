import React, { useState } from 'react';
import TimetablesContainer from '../timetables/TimetablesContainer';
import { Box, Button, Stack, Typography } from '@mui/material';
import Patients from '../users/Patients';
import useToggle from '../../hooks/useToggle';
import AppointmentContext from '../../hooks/AppointmentContext';
import { Appointment } from '../../model/Model';
import Styles from '../../components/styles/UserManagmentStyles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectType } from '../../store/slices/auth/authSlice';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ErrorModal from '../../components/modals/ErrorModal';
import { AppDispatch } from '../../store/types';
import { bookTimeslot } from '../../store/slices/timeslot/timeslotSlice';
import { deletePatientFromUpcomingTimeslot } from '../../store/slices/timeslot/timeslotActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { selectPhysicianNameById } from '../../store/slices/physician/phyNameOccupationSlice';

const BookAppointment = () => {
  const type = useSelector(selectType);
  const dispatch = useDispatch<AppDispatch>();
  const [bookingStep, setBookingStep] = useToggle();
  const selectedPhysicianName = useSelector(selectPhysicianNameById);
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [appointment, setAppointment] = useState<Appointment>({
    physicianId: '',
    date: '',
    time: '',
    patientId: undefined,
  });

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    navigate(ROUTES.HOME);
  };

  const bookAppointment = async () => {
    await dispatch(bookTimeslot(appointment))
      .then((resultAction) => {
        unwrapResult(resultAction);
        setConfirmationMessage('Appointment booked successfully!');
        setIsConfirmationOpen(true);
      })
      .catch(() => {
        setIsErrorModalOpen(true);
      });
  };

  const handleRemovePatientFromTimeslot = async () => {
    const { physicianId, patientId } = appointment;
    if (typeof patientId === 'string') {
      await dispatch(
        deletePatientFromUpcomingTimeslot({ physicianId, patientId }),
      );
      await bookAppointment();
      setConfirmationMessage(
        'Appointment canceled and a new one booked successfully!',
      );
      setIsErrorModalOpen(false);
      setIsConfirmationOpen(true);
    }
  };

  const appointmentInfo = (
    <Box style={{ textAlign: 'center', marginTop: 10 }}>
      {'Selected Physician: '} <b>{selectedPhysicianName}</b>
      {' | Selected Time: '}
      <b>{appointment.date + ', ' + appointment.time}</b>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', marginTop: '30px' }}>
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        marginBottom={3}
      >
        <AppointmentContext.Provider value={{ appointment, setAppointment }}>
          {bookingStep ? (
            <Stack style={{ alignItems: 'center' }}>
              <h1 style={{ margin: 0 }}>Select Patient</h1>
              <Typography variant='h1'>
                <Patients />
              </Typography>
              {appointmentInfo}
            </Stack>
          ) : (
            <TimetablesContainer
              tableTitle={
                (type === 'physician' && 'Select Time') ||
                'Select Physician and Time'
              }
            />
          )}
        </AppointmentContext.Provider>
        <Box
          display='flex'
          justifyContent='center'
          padding={3}
          sx={{
            width: '95%',
          }}
        >
          <Button
            variant='contained'
            onClick={setBookingStep}
            disabled={!bookingStep}
            sx={bookingStep ? Styles.createNewUserBtn : { opacity: '0' }}
          >
            <ArrowBackIcon /> Previous
          </Button>
          {bookingStep && (
            <Button
              variant='contained'
              onClick={bookAppointment}
              disabled={
                appointment.patientId === undefined || appointment.time === ''
              }
              sx={Styles.createNewUserBtn}
            >
              Book an appointment
            </Button>
          )}
          {!bookingStep && type === 'patient' && (
            <Button
              variant='contained'
              onClick={bookAppointment}
              disabled={appointment.time === ''}
              sx={Styles.createNewUserBtn}
            >
              Book Appointment
            </Button>
          )}
          {!bookingStep && type !== 'patient' && (
            <Button
              variant='contained'
              onClick={setBookingStep}
              sx={Styles.createNewUserBtn}
              disabled={!appointment.date}
            >
              Next
              <ArrowForwardIcon />
            </Button>
          )}
          <ConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={handleConfirmationClose}
            message={confirmationMessage}
          />
          <ErrorModal
            isOpen={isErrorModalOpen}
            onYesClick={handleRemovePatientFromTimeslot}
            onClose={handleConfirmationClose}
            message='An appointment is already scheduled with this physician. Would you like to cancel it?'
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default BookAppointment;
