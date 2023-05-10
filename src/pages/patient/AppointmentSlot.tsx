import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../../components/modals/AlertModal';
import { selectId } from '../../store/slices/auth/authSlice';
import {
  deleteAppointment,
  fetchPatientAppointments,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import { setPhysicianId } from '../../store/slices/physician/phyNameOccupationSlice';
import { UUID } from 'crypto';
import { PatientAppointments } from '../../model/Model';
interface Props {
  appointment: PatientAppointments;
}

const AppointmentSlot: FC<Props> = ({ appointment }) => {
  const userId = sessionStorage.getItem('userId');
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [physicianId, setphysicianId] = useState<string>();
  const handleCancel = async () => {
    await dispatch(
      deleteAppointment({
        PhysicianId: physicianId,
        PatientId: userId,
      }),
    );
    dispatch(fetchPatientAppointments(userId));
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  const handleAlertOpen = (id: string) => {
    setOpen(true);
    setphysicianId(id);
  };

  return (
    <>
      <AlertModal
        open={open}
        message='Are you sure you want to Cancel appointment'
        onClose={closeAlert}
        onConfirm={handleCancel}
        confirmMsg='Yes'
        closeMsg='No'
      />

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
          <Box sx={{ marginLeft: '40px', width: '160px' }}>
            <Typography fontWeight={'bold'} variant='h5'>
              Date
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ marginTop: '20px' }} fontWeight={'600'}>
                {dayjs(appointment.timeslot.date).format('YYYY-MM-DD')}
              </Typography>
              <Typography
                sx={{ marginTop: '20px', marginLeft: '10px' }}
                fontWeight={'600'}
              >
                {dayjs(appointment.timeslot.date).format('hh:mm')}
              </Typography>
            </Box>
          </Box>
          <Box>
            {!dayjs().isAfter(appointment.timeslot.date) && (
              <Button
                onClick={() => handleAlertOpen(appointment.physicianId)}
                variant='outlined'
                sx={{
                  marginLeft: '300px',
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
    </>
  );
};

export default AppointmentSlot;
