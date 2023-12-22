import React from 'react';
import { Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useAppSelector } from '../../store/hooks';
import { selectTimeslot } from '../../store/slices/timeslot/timeslotSlice';
import { selectPhysician } from '../../store/slices/users/physiciansSlice';

const AppointmentInfo = () => {
  const { name, surname } = useAppSelector(selectPhysician);
  const { date } = useAppSelector(selectTimeslot);
  return (
    <Paper elevation={2} sx={{ padding: 1, marginTop: 1 }}>
      <Typography variant='body1'>
        Physician: <b>{`${name} ${surname}`}</b> | Selected Time:
        <b>{dayjs(date).format(' YYYY-MM-DD HH:mm')}</b>
      </Typography>
    </Paper>
  );
};

export default AppointmentInfo;
