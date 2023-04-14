import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { timeInputIsValid } from '../utils';
import axios from 'axios';

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

const postTimeslot = (id: string, date: string, time: string) => {
  console.log(`ID: ${id},date: ${date}, time: ${time}`);
  axios
    .post('http://localhost:8080/timeslot', {
      physicianId: id,
      date: date,
      time: time,
    })
    .then((responce) => {
      console.log(responce.status);
    });
};

const TimeslotModal = ({
  openModal,
  closeModal,
  loadData,
  id,
  date,
}: Props) => {
  const [time, setTime] = useState<string>('');
  const [inputValid, setInputValid] = useState<boolean>(true);
  const [helperText, setHelperText] = useState<string>('');

  const onModalSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    if (timeInputIsValid(time)) {
      postTimeslot(id, date, time);
      setInputValid(true);
      setHelperText('');
      setTime(``);
      loadData();
      closeModal();
    } else {
      setInputValid(false);
      setHelperText('From 06:00 to 19:59');
    }
  };

  const onModalClose = () => {
    setTime(``);
    setInputValid(true);
    closeModal();
  };

  return (
    <Modal open={openModal} onClose={onModalClose}>
      <Box sx={style}>
        <Typography variant='h6' component='h2'>
          Choose time
        </Typography>
        <TextField
          error={!inputValid}
          placeholder='10:30'
          helperText={helperText}
          type='string'
          onChange={(event) => setTime(event.target.value)}
        />
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant='contained'
            onClick={(event) => {
              onModalSubmit(event);
            }}
          >
            Add timeslot
          </Button>
          <Button variant='contained' onClick={onModalClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default TimeslotModal;
