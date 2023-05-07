import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  const { isOpen, onClose, message } = props;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent sx={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', margin: '0.5rem' }}>{message}</p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant='contained'
          color='primary'
          size='large'
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
