import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, Popper, Button, Typography, Alert } from '@mui/material';
import Styles from '../styles/UserManagmentStyles';
import { fetchPatientInfo } from '../../store/slices/patient/patientSlice';
import {
  selectUserName,
  setUser,
} from '../../store/slices/manage-users/userSlice';
import PatientInfoModal from '../modals/PatientInfoModal';
import { cancelAppointment } from '../../store/slices/timeslot/timeslotActions';

interface Props {
  patientId: string;
  timeslotId: string;
  open: boolean;
  switchOpen: () => void;
  anchorEl: HTMLElement | null;
  // onCancelAppointment?: () => void;
}

const TimechipPopper = ({
  patientId,
  timeslotId,
  open,
  switchOpen,
  anchorEl,
}: // onCancelAppointment,
Props) => {
  const dispatch = useAppDispatch();
  const patientName = useAppSelector(selectUserName);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInfoClick = () => {
    dispatch(fetchPatientInfo(patientId));
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    dispatch(setUser(null));
  };

  const onCancelAppointment = () => {
    dispatch(cancelAppointment(timeslotId));
    setTimeout(() => {
      closePopper();
    }, 500);
  };
  const closePopper = () => {
    switchOpen();
    // dispatch(setUser(null));
  };

  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorEl}
        modifiers={[
          {
            name: 'flip',
            enabled: false,
          },
        ]}
        onMouseLeave={closePopper}
      >
        <Box
          sx={{
            border: 1,
            padding: '13px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}
        >
          <Box
            sx={{
              transform: 'translate(30px, -55px)',
              padding: '40px 20px',
              width: '40%',
              position: 'absolute',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '20px',
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                Booked for:
              </Typography>
              <Typography variant='subtitle2'>{patientName}</Typography>
            </Box>
            <Button
              sx={{
                ...Styles.createButton,
                fontSize: '0.7rem',
                padding: '0px 7px',
                marginTop: '0.6rem',
                height: '27px',
              }}
              variant='contained'
              onClick={handleInfoClick}
            >
              MORE INFO
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{
                ...Styles.cancelButton,
                fontSize: '0.7rem',
                padding: '2px 8px',
              }}
              variant='outlined'
              onClick={onCancelAppointment}
            >
              CANCEL APPOINTMENT
            </Button>
          </Box>
        </Box>
      </Popper>
      <PatientInfoModal
        open={modalOpen}
        onClose={handleModalClose}
        patientName={patientName}
      />
    </>
  );
};

export default TimechipPopper;
