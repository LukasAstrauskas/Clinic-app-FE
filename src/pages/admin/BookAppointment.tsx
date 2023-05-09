import React, { useState } from 'react';
import TimetablesContainer from '../timetables/TimetablesContainer';
import { Box, Button, Stack, Typography } from '@mui/material';
import Patients from '../users/Patients';
import useToggle from '../../hooks/useToggle';
import AppointmentContext from '../../hooks/AppointmentContext';
import {
  Appointment,
  TimeslotWithPhysicianAndPatient,
} from '../../model/Model';
import Styles from '../../components/styles/UserManagmentStyles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { removePatientFromTimeslot } from '../../data/fetch';
import { useDispatch, useSelector } from 'react-redux';
import { selectType } from '../../store/slices/auth/authSlice';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ErrorModal from '../../components/modals/ErrorModal';
import { AppDispatch } from '../../store/types';
import { bookTimeslot } from '../../store/slices/timeslot/timeslotSlice';

const BookAppointment = () => {
  const type = useSelector(selectType);
  const dispatch = useDispatch<AppDispatch>();
  const [bookingStep, setBookingStep] = useToggle();

  const [appointment, setAppointment] = useState<Appointment>({
    physicianId: '',
    date: '',
    time: '',
    patientId: undefined,
  });

  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    navigate(ROUTES.HOME);
  };

  const bookAppointment = () => {
    try {
      dispatch(bookTimeslot(appointment));
      setConfirmationMessage('Appointment booked successfully!');
      setIsConfirmationOpen(true);
    } catch (error) {
      setIsErrorModalOpen(true);
    }
  };

  const handleRemovePatientFromTimeslot = async () => {
    const { physicianId, patientId } = appointment;
    const timeslot: TimeslotWithPhysicianAndPatient = {
      physicianId,
      patientId,
    };
    await removePatientFromTimeslot(timeslot);
    setConfirmationMessage('Appointment canceled successfully!');
    setIsErrorModalOpen(false);
    setIsConfirmationOpen(true);
  };

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
            <Typography variant='h1'>
              <Patients />
            </Typography>
          ) : (
            <TimetablesContainer tableTitle='Select Physician and Time' />
          )}
        </AppointmentContext.Provider>
        <Box
          display='flex'
          justifyContent='center'
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
