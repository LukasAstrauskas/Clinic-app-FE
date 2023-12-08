import React from 'react';
import { TableCell, IconButton, Box, Modal, Typography } from '@mui/material';
import { User } from '../../model/Model';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useToggle from '../../hooks/useToggle';
import { useAppDispatch } from '../../store/hooks';
// import { deleteUser } from '../../store/slices/users/userActions';
import AlertModal from '../modals/AlertModal';
import { deleteUser } from '../../store/slices/users/userActions';
import EditUserModalNew from '../modals/EditUserModalNew';

const EditBodyCell = ({ user }: { user: User }) => {
  const { id, name, surname, type } = user;
  const dipatch = useAppDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [openEdit, switchOpenEdit] = useToggle();
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
            console.log(`edit user ${name} ${surname}`);
            switchOpenEdit();
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

      {/* move to EditUserModal */}
      <EditUserModalNew
        open={openEdit}
        switchOpen={switchOpenEdit}
        userToUpdate={user}
      />

      {/* <Modal open={openEdit} onClose={switchOpenEdit}>
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Editing User
          </Typography>
          <Typography sx={{ mt: 2 }}>
            `{name} {surname} {type}
          </Typography>
        </Box>
      </Modal> */}
    </>
  );
};

export default EditBodyCell;
