import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

interface ErrorModalProps {
  isOpen: boolean;
  onYesClick: () => void;
  onClose?: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  const { isOpen, onYesClick, onClose, message } = props;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent sx={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', margin: '0.5rem' }}>{message}</p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onYesClick}
          variant='contained'
          color='primary'
          size='large'
        >
          Yes
        </Button>
        <Button
          onClick={onClose}
          variant='contained'
          color='primary'
          size='large'
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
