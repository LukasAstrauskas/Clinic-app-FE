import React, { useState } from 'react';
import { Box, Button, Modal, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import AlertModal from './AlertModal';
import useToggle from '../../hooks/useToggle';
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
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

const TimeslotSetDateModal = ({ openModal, closeModal, setDate }: Props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [openAlert, toggleAlert] = useToggle();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleDateSubmit = () => {
    const currentDate = new Date();
    const maxDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    maxDate.setMonth(currentDate.getMonth() + 6);

    if (selectedDateObj >= currentDate && selectedDateObj <= maxDate) {
      setDate(selectedDate);
      closeModal();
    } else {
      toggleAlert();
    }
    setSelectedDate('');
  };

  const handleCloseModal = () => {
    closeModal();
    setDate('');
    setSelectedDate('');
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box sx={style}>
          <h2 id='modal-title'>Choose a Date</h2>
          <TextField
            id='date-picker'
            label='Date'
            type='date'
            onChange={handleDateChange}
            sx={{ width: '100%' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
            <Button
              variant='contained'
              onClick={handleDateSubmit}
              sx={Styles.createButton}
            >
              Choose time
            </Button>
            <Button
              variant='contained'
              onClick={handleCloseModal}
              sx={Styles.createButton}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
      <AlertModal
        open={openAlert}
        onClose={toggleAlert}
        message='Please choose a date within the next 6 months.'
        closeMsg='Ok, close.'
      />
    </>
  );
};

export default TimeslotSetDateModal;
