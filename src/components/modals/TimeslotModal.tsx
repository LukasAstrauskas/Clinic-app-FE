import React, { useState, MouseEvent, useEffect } from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';
import { postTimeslot } from '../../store/slices/timeslot/timeslotActions';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Styles from '../styles/UserManagmentStyles';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
};

type Props = {
  openModal: boolean;
  closeModal: () => void;
  loadData: () => void;
  id: string;
  date: string;
};

const TimeslotModal = ({
  openModal,
  closeModal,
  loadData,
  id,
  date,
}: Props) => {
  const [time, setTime] = useState<Dayjs | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [timeError, setTimeError] = useState(false);
  const currentHour = dayjs().hour();
  const currentDay = dayjs().day();
  const selectedHour = dayjs(time).hour();
  const selectedDay = dayjs(time).day();

  useEffect(() => {
    setTime(dayjs(date).startOf('day'));
  }, [date]);

  const saveTimeSlot = () => {
    if (time !== null && selectedHour >= 8 && selectedHour < 20) {
      dispatch(
        postTimeslot({
          physicianId: id,
          date: date,
          time: time.format('HH:mm'),
        }),
      );
      setTime(null);
      loadData();
      closeModal();
    }
    setTimeError(true);
  };

  const onModalSubmit = (e: MouseEvent) => {
    e.preventDefault();
    if (selectedDay > currentDay) {
      saveTimeSlot();
    } else if (selectedDay === currentDay && selectedHour > currentHour) {
      saveTimeSlot();
    } else {
      setTimeError(true);
    }
  };

  const onModalClose = () => {
    setTime(null);
    closeModal();
  };

  return (
    <Modal open={openModal} onClose={onModalClose}>
      <Box sx={style}>
        <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
          Choose time between 08:00 and 20:00
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            label={`For date: ${time?.format('YYYY-MM-DD')}`}
            value={time}
            onChange={(newValue) => setTime(newValue)}
            format='HH:mm'
          />
        </LocalizationProvider>
        {timeError && <h5 style={{ color: 'red' }}>Wrong time selected!</h5>}
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant='contained'
            onClick={onModalSubmit}
            sx={Styles.createButton}
          >
            Add timeslot
          </Button>
          <Button
            variant='contained'
            onClick={onModalClose}
            sx={Styles.createButton}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default TimeslotModal;
