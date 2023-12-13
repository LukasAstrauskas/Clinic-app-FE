import React, { useState } from 'react';
import TimetablesContainer from './TimetablesContainer';
import { Box, Button, Stack, Typography } from '@mui/material';
import useToggle from '../../hooks/useToggle';
import Styles from '../../components/styles/UserManagmentStyles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ErrorModal from '../../components/modals/ErrorModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  pickTimeslot,
  selectTimeslot,
} from '../../store/slices/timeslot/timeslotSlice';
import {
  bookTimeslot,
  deletePatientFromUpcomingTimeslot,
} from '../../store/slices/timeslot/timeslotActions';
import { selectLoggedUserType } from '../../store/slices/loggedUser/loggedUserSlice';
import { PATIENT } from '../../utils/Users';
import UserTable from './UserTable';
import { selectPhysician } from '../../store/slices/physician/physicianSlice';
import UserSearchBar from './UserSearchBar';
import {
  clearPatients,
  selectPatientSearch,
  selectPatients,
  setPatientSearch,
} from '../../store/slices/users/patientsSlice';
import { getUsers } from '../../store/slices/users/userActions';
import { User } from '../../model/Model';

const BookAppointment = () => {
  const type: string = useAppSelector(selectLoggedUserType);
  const selectedPhysician = useAppSelector(selectPhysician);
  const dispatch = useAppDispatch();
  const [bookingStep, setBookingStep] = useToggle();

  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const timeslot = useAppSelector(selectTimeslot);

  const patients = useAppSelector(selectPatients);
  const search = useAppSelector(selectPatientSearch);
  const patient = PATIENT;

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    navigate(ROUTES.HOMEPAGE);
  };

  const bookAppointment = async () => {
    let message = '';
    await dispatch(bookTimeslot(timeslot))
      .unwrap()
      .then(() => {
        message = 'Appointment booked successfully!';
      })
      .catch(() => {
        message = 'You have already booked appointment with this physician. ';
      })
      .finally(() => {
        setConfirmationMessage(message);
        setIsConfirmationOpen(true);
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

  const onSearch = (search: string, userType: string) => {
    dispatch(setPatientSearch(search));
    dispatch(clearPatients());
    dispatch(
      getUsers({
        search,
        userType,
      }),
    );
  };

  const rowClick = (patientId: string) => {
    dispatch(pickTimeslot({ ...timeslot, patientId }));
  };

  const appointmentInfo = (
    <Box style={{ textAlign: 'center', marginTop: 10 }}>
      Selected Physician:
      <b>
        {selectedPhysician.name} {selectedPhysician.surname}
      </b>
      {' | Selected Time: '}
      <b>{timeslot.date}</b>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        marginBottom={3}
      >
        {bookingStep ? (
          <Stack style={{ alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>Select Patient</h1>
            <Typography variant='h1'>
              <UserSearchBar
                onSearch={onSearch}
                userType={patient}
                searchState={search}
              />
              <UserTable
                userType={patient}
                users={patients}
                search={search}
                onClick={rowClick}
                selectedID={timeslot.patientId}
              />
            </Typography>
            {appointmentInfo}
          </Stack>
        ) : (
          <TimetablesContainer />
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
              disabled={timeslot.patientId === ''}
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
              disabled={timeslot.id === ''}
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
