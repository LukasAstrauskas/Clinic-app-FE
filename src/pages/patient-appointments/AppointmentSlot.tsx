import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AlertModal from '../../components/modals/AlertModal';
import { PatientAppointment } from '../../model/Model';
import { fetchUpcomingPatientAppointments } from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import { deletePatientFromUpcomingTimeslot } from '../../store/slices/timeslot/timeslotActions';
interface Props {
  appointment: PatientAppointment;
}

const AppointmentSlot = ({ appointment }: Props) => {
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
    await dispatch(fetchUpcomingPatientAppointments(patientId));
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
              {appointment.name} {appointment.surname}, {appointment.occupation}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: '40px', width: '160px' }}>
            <Typography fontWeight={'bold'} variant='h5'>
              Date
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ marginTop: '20px' }} fontWeight={'600'}>
                {dayjs(appointment.date).format('YYYY-MM-DD HH:mm')}
              </Typography>
            </Box>
          </Box>
          <Box>
            {dayjs().isBefore(appointment.date) && (
              <Button
                onClick={() => handleAlertOpen(appointment.id)}
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
