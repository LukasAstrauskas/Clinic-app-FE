import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import TextField from '@mui/material/TextField';

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
  const onModalClose = () => {
    closeModal();
  };

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value >= Date()) {
      setSelectedDate(event.target.value);
    }
  };

  const handleDateSubmit = () => {
    setDate(selectedDate);
    closeModal();
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={onModalClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box sx={style}>
          <h2 id='modal-title'>Choose a Date</h2>
          <TextField
            id='date-picker'
            label='Date'
            type='date'
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ width: '100%' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant='contained' onClick={handleDateSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
      ;
    </>
  );
};

export default TimeslotSetDateModal;
