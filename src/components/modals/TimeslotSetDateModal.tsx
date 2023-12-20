import React, { useState } from 'react';
import { Box, Button, Modal, Stack } from '@mui/material';
import Styles from '../styles/UserManagmentStyles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const style = {
  position: 'absolute',
  top: '30%',
  left: '52%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  padding: 4,
};

type Props = {
  openModal: boolean;
  closeModal: () => void;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

const TimeslotSetDateModal = ({ openModal, closeModal, setDate }: Props) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());

  const datePicked = (newValue: dayjs.Dayjs | null) => {
    setDateValue(newValue);
  };

  const chooseDate = () => {
    const dateString = dateValue ? dateValue?.format('YYYY-MM-DD') : '';
    setDate(dateString);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setDateValue(dayjs());
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box sx={style}>
        <h2 id='modal-title'>Choose a Date</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disablePast
            label='Date'
            views={['day']}
            format='YYYY-MM-DD'
            defaultValue={dayjs()}
            value={dateValue}
            onChange={datePicked}
            maxDate={dayjs().add(6, 'month')}
            slotProps={{
              textField: {
                helperText: 'Choose a date within the next 6 months.',
              },
            }}
          />
        </LocalizationProvider>

        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant='contained'
            onClick={chooseDate}
            sx={Styles.createButton}
            disabled={!dateValue}
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
  );
};

export default TimeslotSetDateModal;
