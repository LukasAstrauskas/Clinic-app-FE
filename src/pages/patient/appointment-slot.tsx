// import { Box, Button, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAppointment,
  fetchPatientAppointments,
  selectAppointments,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import moment from 'moment';
import { Box, Button, Typography } from '@mui/material';
import ConfirmModal from '../../components/modals/AlertModal';
interface Props {
  appointments: any;
}

const AppointmentSlot: FC<Props> = ({ appointments }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [selectedAppointmentToCancel, setSelectedAppointmentToCancel] =
    useState('string');
  const handleCancel = async () => {
    await dispatch(deleteAppointment(selectedAppointmentToCancel));
    dispatch(fetchPatientAppointments('52e2fc8e-d5b1-43e0-bde6-5dca5f96ced3'));
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  const handleAlertOpen = (id: string) => {
    setOpen(true);
    setSelectedAppointmentToCancel(id);
  };

  return (
    <>
      <ConfirmModal
        open={open}
        message='Are you sure you want to Cancel appointment'
        onClose={closeAlert}
        onConfirm={handleCancel}
        confirmMsg='Yes'
        closeMsg='No'
      />
      {appointments.map((appointment: any) => (
        <Box
          key={appointment.physicianId}
          sx={{
            marginTop: '40px',
            borderRadius: '20px',
            border: '1px solid black',
            height: '130px',
          }}
        >
          <Box
            sx={{
              padding: '20px',
              paddingX: '40px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ width: '330px' }}>
              <Typography fontWeight={'bold'} variant='h5'>
                Physician
              </Typography>
              <Typography sx={{ marginTop: '20px' }} fontWeight={'500'}>
                {appointment.physicianName}, {appointment.occupation.name}
              </Typography>
            </Box>
            <Box sx={{ marginLeft: '150px' }}>
              <Typography fontWeight={'bold'} variant='h5'>
                Date
              </Typography>
              <Typography sx={{ marginTop: '20px' }} fontWeight={'600'}>
                {moment(appointment.timeslot.date).format('Y-M-D ')}
                {moment(appointment.timeslot.date).format('h:mm')}
              </Typography>
            </Box>
            <Box>
              {!moment().isAfter(appointment.timeslot.date) && (
                <Button
                  // onClick={() => handleCancel(appointment.physicianId)}
                  onClick={() => handleAlertOpen(appointment.physicianId)}
                  variant='outlined'
                  sx={{
                    marginLeft: '230px',
                    color: 'orange',
                    border: '1px solid orange !important',
                    fontWeight: '600',
                  }}
                >
                  CANCEL APPOINTMENT
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default AppointmentSlot;
