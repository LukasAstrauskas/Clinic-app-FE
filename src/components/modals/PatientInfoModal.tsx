import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPatientAdditionalInfo } from '../../store/slices/patient/patientSlice';
import Styles from '../styles/UserManagmentStyles';

interface Props {
  open: boolean;
  onClose: () => void;
  patientName: string;
}

const PatientInfoModal = ({ open, onClose, patientName }: Props) => {
  const patientInfo = useSelector(selectPatientAdditionalInfo);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '80%',
          width: '30%',
          backgroundColor: 'white',
          padding: '30px 30px',
          borderRadius: '10px',
        }}
      >
        <Box>
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Patient Info
          </Typography>

          <Typography
            variant='h5'
            sx={{
              marginTop: '20px',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            Main Information
          </Typography>
          <Box sx={{ fontSize: '3px' }}>
            <Typography>Name: {patientName}</Typography>
            <Typography>Gender: {patientInfo?.gender}</Typography>
            <Typography>
              Birthdate: {patientInfo?.birthDate?.toString()}
            </Typography>
            <Typography>Phone Number: {patientInfo?.phone}</Typography>
          </Box>

          <Typography
            variant='h5'
            sx={{
              marginTop: '30px',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            Address
          </Typography>
          <Typography>Street: {patientInfo?.street}</Typography>
          <Typography>City: {patientInfo?.city}</Typography>
          <Typography>Postal Code: {patientInfo?.postalCode}</Typography>
          <Typography>Country: {patientInfo?.country}</Typography>

          <Typography
            variant='h5'
            sx={{
              marginTop: '30px',
              marginBottom: '10px',
              fontWeight: '600',
            }}
          >
            Emergency Contact
          </Typography>
          <Typography>
            Name: {patientInfo?.emergencyName} {patientInfo?.emergencyLastName}
          </Typography>
          <Typography>Phone Number: {patientInfo?.emergencyPhone}</Typography>
          <Typography>Relation: {patientInfo?.emergencyRelation}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '30px',
          }}
        >
          <Button
            sx={{
              ...Styles.cancelButton,
            }}
            variant='outlined'
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientInfoModal;
