import React from 'react';
import { AppDispatch } from '../../store/types';
import { Box, Popper, Button, Typography } from '@mui/material';
import Styles from '../../components/styles/UserManagmentStyles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientInfo } from '../../store/slices/patient/patientSlice';
import { selectUserName } from '../../store/slices/user/userSlice';
import PatientInfoModal from '../../components/modals/PatientInfoModal';

interface Props {
  patientId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  anchorEl: HTMLElement | null;
  onCancelAppointment?: () => void;
}

const TimechipPopper = ({
  patientId,
  open,
  setOpen,
  anchorEl,
  onCancelAppointment,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const patientName = useSelector(selectUserName);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleInfoClick = () => {
    dispatch(fetchPatientInfo(patientId));
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
      >
        <Box
          sx={{
            border: 1,
            padding: '13px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}
          onMouseLeave={() => setOpen(false)}
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
              onClick={() => onCancelAppointment && onCancelAppointment()}
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
