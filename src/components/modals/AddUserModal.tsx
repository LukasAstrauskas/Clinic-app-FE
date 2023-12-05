import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { type } from 'os';
import React, { useState } from 'react';
import useToggle from '../../hooks/useToggle';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { User, UserDTO } from '../../model/Model';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { selectOccupations } from '../../store/slices/occupation/occupationSlice';
import { PHYSICIAN } from '../../utils/Users';
import shadows from '@mui/material/styles/shadows';

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

  const initialUser: UserDTO = {
    id: '',
    name: '',
    surname: '',
    password: '',
    email: '',
    type: userType,
    occupationId: '',
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
    // closeModal();
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
                  setUser({ ...user, email: event.target.value });
                }}
                value={user.email}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                autoComplete='off'
                placeholder='Secret'
                onChange={(event) => {
                  //   const password = event.target.value;
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
                  {occupations.map((occupation) => (
                    <MenuItem key={occupation.id} value={occupation.id}>
                      {occupation.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        </Box>

        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          User: N:{user.name} S:{user.surname} E:{user.email} P:{user.password}
          Type:{user.type} Occ:{user.occupationId}
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
