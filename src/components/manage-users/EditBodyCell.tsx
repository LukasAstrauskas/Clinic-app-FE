import React from 'react';
import { TableCell, IconButton } from '@mui/material';
import { User } from '../../model/Model';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useToggle from '../../hooks/useToggle';
import { useAppDispatch } from '../../store/hooks';
import AlertModal from '../modals/AlertModal';
import { deleteUser } from '../../store/slices/users/userActions';
import { setUser } from '../../store/slices/manage-users/userSlice';

const EditBodyCell = ({ user }: { user: User }) => {
  const { id, name, surname, type } = user;
  const dipatch = useAppDispatch();
  const [openAlert, switchOpenAlert] = useToggle();

  const handleDeleteUser = () => {
    dipatch(deleteUser({ id, type }));
    switchOpenAlert();
  };

  return (
    <>
      <TableCell>
        <IconButton
          color='success'
          onClick={() => {
            dipatch(setUser(user));
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton color='success' onClick={switchOpenAlert}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <AlertModal
        open={openAlert}
        onClose={switchOpenAlert}
        message={`Delete ${name} ${surname}!`}
        onConfirm={handleDeleteUser}
        confirmMsg='Confirm'
        closeMsg='Cancel'
      />
    </>
  );
};

export default EditBodyCell;
