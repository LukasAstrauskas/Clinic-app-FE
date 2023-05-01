import React, { useState } from 'react';
import TimetablesContainer from '../timetables/TimetablesContainer';
import { Box, Button, Stack } from '@mui/material';
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
import {
  countUpcomingTimeslotsWithPhysician,
  removePatientFromTimeslot,
  updateTimeslot,
} from '../../data/fetch';
import { useSelector } from 'react-redux';
import { selectType } from '../../store/slices/auth/authSlice';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ErrorModal from '../../components/modals/ErrorModal';

const BookAppointment = () => {
  const type = useSelector(selectType);
  const [picker, setpicker] = useToggle();

  const [appointment, setAppointment] = useState<Appointment>({
    physicianId: ' ',
    date: '',
    time: '',
    patientId: ' ',
  });

  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    navigate(ROUTES.HOME);
  };

  const bookAppointment = async () => {
    const appointments = await countUpcomingTimeslotsWithPhysician(appointment);

    if (appointments > 0) {
      setIsErrorModalOpen(true);
      return;
    }
    await updateTimeslot(appointment);
    setConfirmationMessage('Appointment booked successfully!');
    setIsConfirmationOpen(true);
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
    <Box sx={{ width: '100%' }}>
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        spacing={2}
      >
        <AppointmentContext.Provider value={{ appointment, setAppointment }}>
          {picker ? (
            <Patients />
          ) : (
            <TimetablesContainer tableTitle='Select Physician and Time' />
          )}
        </AppointmentContext.Provider>
        <Box
          display='flex'
          justifyContent='space-between'
          sx={{
            width: '60%',
          }}
        >
          <Button
            variant='contained'
            onClick={setpicker}
            disabled={!picker}
            sx={picker ? Styles.createNewUserBtn : { opacity: '0' }}
          >
            <ArrowBackIcon /> Previous
          </Button>
          {picker && (
            <Button
              variant='contained'
              onClick={bookAppointment}
              disabled={
                appointment.patientId === ' ' || appointment.time === ''
              }
              sx={Styles.createNewUserBtn}
            >
              <Button
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                Book an appontment
              </Button>
            </Button>
          )}
          {!picker && (
            <Button
              variant='contained'
              onClick={type === 'patient' ? bookAppointment : setpicker}
              disabled={appointment.time === ''}
              sx={Styles.createNewUserBtn}
            >
              {type === 'patient' ? 'Book Appointment' : 'Next'}
              {type === 'patient' ? '' : <ArrowForwardIcon />}
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
