import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAppointment,
  fetchPastPatientAppointments,
  fetchPatientAppointments,
  selectAppointments,
  selectPastAppointments,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import moment from 'moment';
import { Box, Button, Typography } from '@mui/material';
import ConfirmModal from '../../components/modals/AlertModal';
import { selectId } from '../../store/slices/auth/authSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { any } from 'prop-types';
import { PatientAppointments } from '../../model/Model';
import AppointmentSlot from './appointment-slot';
interface Props {
  appointments: PatientAppointments[];
}
const UpcomingAppointmentsTab: FC<Props> = ({ appointments }) => {
  return (
    <>
      <Box
        sx={{ height: 600 }}
        style={{
          overflow: 'auto',
        }}
      >
        {appointments.map((appointment: any) => (
          <AppointmentSlot
            key={appointment.physicianId}
            appointment={appointment}
          ></AppointmentSlot>
        ))}
      </Box>
    </>
  );
};

export default UpcomingAppointmentsTab;
