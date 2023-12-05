import { TableCell, IconButton, Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { User } from '../../model/Model';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useToggle from '../../hooks/useToggle';

const EditBodyCell = ({ user }: { user: User }) => {
  const { name, surname, type } = user;

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
  const [open, switchOpen] = useToggle();

  return (
    <>
      <TableCell>
        <IconButton
          color='success'
          onClick={() => {
            console.log(`edit user ${name} ${surname}`);
            switchOpen();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color='success'
          onClick={() => {
            console.log('del user');
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>

      <Modal
        open={open}
        onClose={switchOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Editing User
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            `{name} {surname} {type}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default EditBodyCell;
