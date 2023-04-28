import React, { useState } from 'react';
import TimetablesContainer from '../timetables/TimetablesContainer';
import { Box, Button, Stack } from '@mui/material';
import Patients from '../users/Patients';
import useToggle from '../../hooks/useToggle';
import AppointmentContext from '../../hooks/AppointmentContext';
import { Appointment } from '../../model/Model';
import Styles from '../../components/styles/UserManagmentStyles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { updateTimeslot } from '../../data/fetch';
import { useSelector } from 'react-redux';
import { selectType } from '../../store/slices/auth/authSlice';

const BookAppointment = () => {
  const type = useSelector(selectType);
  const [picker, setpicker] = useToggle();

  const [appointment, setAppointment] = useState<Appointment>({
    physicianId: ' ',
    date: '',
    time: '',
    patientId: ' ',
  });

  const bookAppointment = () => {
    updateTimeslot(appointment);
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
              <NavLink
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
                to={ROUTES.HOME}
              >
                Book an appontment
              </NavLink>
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
        </Box>
      </Stack>
    </Box>
  );
};

export default BookAppointment;
