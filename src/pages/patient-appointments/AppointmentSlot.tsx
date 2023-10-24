import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import AlertModal from '../../components/modals/AlertModal';
import { PatientAppointment } from '../../model/Model';
import { useAppDispatch } from '../../store/hooks';
import { patientCancelAppointment } from '../../store/slices/loggedUser/loggedUserSlice';
interface Props {
  appointment: PatientAppointment;
}

const AppointmentSlot = ({ appointment }: Props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleCancel = async () => {
    dispatch(patientCancelAppointment(appointment.id));
    setOpen(false);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  const handleAlertOpen = () => {
    setOpen(true);
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
                onClick={handleAlertOpen}
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
