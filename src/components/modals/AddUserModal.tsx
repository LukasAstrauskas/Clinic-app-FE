import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import useToggle from '../../hooks/useToggle';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserDTO } from '../../model/Model';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectOccupations } from '../../store/slices/occupation/occupationSlice';
import { PHYSICIAN } from '../../utils/Users';
import { insertUser } from '../../store/slices/users/userActions';

type props = {
  open: boolean;
  switchOpen: () => void;
  userType: string;
};

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

const AddUserModal = ({ open, switchOpen, userType }: props) => {
  const occupations = useAppSelector(selectOccupations);
  const [showPass, switchShowPass] = useToggle();
  const dispatch = useAppDispatch();

  const initialUser: UserDTO = {
    id: '',
    name: '',
    surname: '',
    password: '',
    email: '',
    type: userType,
    occupationId: null,
  };
  const [user, setUser] = useState(initialUser);

  const closeModal = () => {
    setUser(initialUser);
    if (showPass) {
      switchShowPass();
    }
    switchOpen();
  };

  const addUser = () => {
    if (showPass) switchShowPass();
    setUser(initialUser);
    dispatch(insertUser(user));
    closeModal();
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={style}>
        <Typography variant='h6' align='center'>
          Add User: {userType.toUpperCase()}
        </Typography>
        <Box component='form' noValidate autoComplete='off'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                placeholder='Name'
                onChange={(event) => {
                  const name = event.target.value;
                  setUser({ ...user, name });
                }}
                value={user.name}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                placeholder='Surname'
                onChange={(event) => {
                  const surname = event.target.value;
                  setUser({ ...user, surname });
                }}
                value={user.surname}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                autoComplete='off'
                placeholder='Post'
                onChange={(event) => {
                  const email = event.target.value;
                  setUser({ ...user, email });
                }}
                value={user.email}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                autoComplete='off'
                placeholder='Secret'
                onChange={(event) => {
                  setUser({ ...user, password: event.target.value });
                }}
                value={user.password}
                type={showPass ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={switchShowPass}
                      edge='end'
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            {userType === PHYSICIAN && (
              <Grid item xs={6}>
                <TextField
                  sx={{ width: '100%' }}
                  id='outlined-select-currency'
                  select
                  label='Occupation'
                  variant='standard'
                  onChange={(event) => {
                    setUser({ ...user, occupationId: event.target.value });
                  }}
                  value={user.occupationId}
                >
                  {occupations.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        </Box>

        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          User: N:{user.name} S:{user.surname} E:{user.email} P:{user.password}
          Type:{user.type} Occ:
          {user.occupationId === null ? 'Null' : user.occupationId}
        </Typography>
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          alignItems='center'
        >
          <Button variant='contained' color='success' onClick={addUser}>
            Add
          </Button>
          <IconButton color='success' onClick={closeModal}>
            <CancelIcon fontSize='large' />
          </IconButton>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
