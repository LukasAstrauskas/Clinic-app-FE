import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react';
import useToggle from '../../hooks/useToggle';
import AddUserModal from '../../components/modals/AddUserModal';

type props = {
  userType?: string;
};

const AddUserButton = ({ userType = '' }: props): JSX.Element => {
  const [open, switchOpen] = useToggle();
  return (
    <>
      <IconButton
        color='success'
        onClick={() => {
          switchOpen();
          console.log('open Add User modal' + open.valueOf());
        }}
      >
        <AddCircleIcon fontSize='large' />
      </IconButton>
      <AddUserModal open={open} switchOpen={switchOpen} userType={userType} />
    </>
  );
};

export default AddUserButton;
