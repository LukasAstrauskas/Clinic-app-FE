import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  open: boolean;
  onClose: () => void;
  message?: string;
  onConfirm?: () => void;
  confirmMsg?: string;
  closeMsg?: string;
};

const ConfirmModal = ({
  open,
  onClose,
  message = 'Alert!',
  onConfirm,
  confirmMsg: agree = 'Agree',
  closeMsg: close = 'Close',
}: Props) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{message}</DialogTitle>
        <DialogActions>
          {onConfirm !== undefined && (
            <Button onClick={onConfirm}>{agree}</Button>
          )}
          <Button onClick={onClose} autoFocus>
            {close}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
