import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Modal, Stack, Typography } from '@mui/material';
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
  const dayStart = dayjs(date).startOf('day');
  const [time, setTime] = useState<Dayjs>(dayStart);
  const dispatch = useDispatch<AppDispatch>();
  const [timeError, setTimeError] = useState(false);

  useEffect(() => {
    setTime(dayStart);
  }, [openModal]);

  const saveTimeSlot = () => {
    dispatch(
      postTimeslot({
        physicianId: id,
        date: date,
        time: time.format('HH:mm'),
      }),
    );
    loadData();
    closeModal();
  };

  const validateTimeInput = (timeVal: Dayjs) => {
    const isTimeAfterNow = timeVal.isAfter(dayjs());
    const isFromDuskTillDawn = timeVal.hour() >= 20 || timeVal.hour() < 8;
    isTimeAfterNow && !isFromDuskTillDawn
      ? setTimeError(false)
      : setTimeError(true);
  };

  const onModalClose = () => {
    setTimeError(false);
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
            label={`For date: ${time.format('YYYY-MM-DD')}`}
            value={time}
            onChange={(newValue) => {
              if (newValue !== null) {
                setTime(newValue);
                validateTimeInput(newValue);
              }
            }}
            format='HH:mm'
            sx={{ width: '100%' }}
          />
        </LocalizationProvider>
        {timeError && (
          <Alert severity='error' sx={{ marginTop: 1, padding: 0 }}>
            Wrong time selected!
          </Alert>
        )}
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant='contained'
            disabled={timeError || time.isSame(dayStart)}
            onClick={saveTimeSlot}
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
