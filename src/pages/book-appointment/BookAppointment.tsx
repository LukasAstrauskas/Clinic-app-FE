import React, { useState } from 'react';
import TimetablesContainer from './TimetablesContainer';
import { Box, Button, Stack, Typography } from '@mui/material';
import Patients from '../manage-users/Patients';
import useToggle from '../../hooks/useToggle';
import { Timeslot } from '../../model/Model';
import Styles from '../../components/styles/UserManagmentStyles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ErrorModal from '../../components/modals/ErrorModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  bookTimeslot,
  selectTimeslot,
} from '../../store/slices/timeslot/timeslotSlice';
import { deletePatientFromUpcomingTimeslot } from '../../store/slices/timeslot/timeslotActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { selectLoggedUserType } from '../../store/slices/loggedUser/loggedUserSlice';
import { PATIENT, PHYSICIAN } from '../../utils/Users';

const BookAppointment = () => {
  const type = useAppSelector(selectLoggedUserType);
  const dispatch = useAppDispatch();
  const [bookingStep, setBookingStep] = useToggle();

  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  // const [appointment, setAppointment] = useState<Timeslot>({
  //   id: '',
  //   physicianId: '',
  //   date: '',
  //   patientId: '',
  // });

  const timeslot = useAppSelector(selectTimeslot);

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    navigate(ROUTES.HOMEPAGE);
  };

  const bookAppointment = async () => {
    await dispatch(bookTimeslot(timeslot))
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
    const { physicianId, patientId } = timeslot;
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
      {'Selected Physician: '} <b>`Skip`</b>
      {' | Selected Time: '}
      <b>{timeslot.date}</b>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      <p>
        Step: {bookingStep.toString()} TYpe: {type} {PATIENT === type && 'TRUE'}
      </p>
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        marginBottom={3}
      >
        <p>Slot ID: {timeslot.id}</p>
        <p>Ph. ID: {timeslot.physicianId}</p>
        <p>Date: {timeslot.date}</p>
        <p>
          Pat. ID:
          {timeslot.patientId === null ? 'Null' : timeslot.patientId}
        </p>
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
              (type === PHYSICIAN && 'Select Time') ||
              'Select Physician and Time'
            }
          />
        )}

        <Box
          display='flex'
          justifyContent='center'
          sx={{
            width: '95%',
            border: 2,
            borderColor: 'secondary.main',
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
                timeslot.patientId === undefined || timeslot.date === ''
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
              disabled={timeslot.id === ''}
              sx={Styles.createNewUserBtn}
            >
              Patient Book Appointment
            </Button>
          )}
          {!bookingStep && type !== 'patient' && (
            <Button
              variant='contained'
              onClick={setBookingStep}
              sx={Styles.createNewUserBtn}
              // disabled={!appointment.date}
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
