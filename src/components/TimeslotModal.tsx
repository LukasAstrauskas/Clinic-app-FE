import React, { useState } from 'react';
import { Box, Button, Input, Modal, Stack, Typography } from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  openModal: boolean;
  closeModal: () => void;
  id: string;
  date: string;
};

const TimeslotModal = ({ openModal, closeModal, id, date }: Props) => {
  const [time, setTime] = useState<string>('10:30');

  const onModalSubmit = () => {
    console.log(`ID: ${id},date: ${date}, time: ${time}`);
    setTime(`10:30`);
    closeModal();
  };

  const onModalClose = () => {
    setTime(`10:30`);
    closeModal();
  };

  return (
    <Modal open={openModal} onClose={onModalClose}>
      <Box sx={style}>
        <Typography variant='h6' component='h2'>
          Choose time
        </Typography>

        <Input
          value={time}
          type='string'
          onChange={(event) => setTime(event.target.value)}
        />
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant='contained'
            onClick={() => {
              onModalSubmit();
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
