import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import AlertModal from '../../components/modals/AlertModal';
import { PatientAppointments } from '../../model/Model';
import { fetchPatientAppointments } from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import { deletePatientFromUpcomingTimeslot } from '../../store/slices/timeslot/timeslotActions';
interface Props {
  appointment: PatientAppointments;
}

const AppointmentSlot: FC<Props> = ({ appointment }) => {
  const patientId = sessionStorage.getItem('userId') || '';
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [physicianId, setphysicianId] = useState<string>('');
  const handleCancel = async () => {
    await dispatch(
      deletePatientFromUpcomingTimeslot({
        physicianId,
        patientId,
      }),
    );
    await dispatch(fetchPatientAppointments(patientId));
    setOpen(false);
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
        sx={{
          marginTop: '40px',
          borderRadius: '20px',
          border: '1px solid lightgrey',
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
              {appointment.physicianName}, {appointment.occupation?.name || ''}
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
                {dayjs(appointment.timeslot.date).format('HH:mm')}
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
                  fontWeight: '400',
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
