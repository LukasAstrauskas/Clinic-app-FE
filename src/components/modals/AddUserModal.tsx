import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import useToggle from '../../hooks/useToggle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserDTO } from '../../model/Model';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectOccupations } from '../../store/slices/occupation/occupationSlice';
import { PHYSICIAN } from '../../utils/Users';
import { insertUser } from '../../store/slices/users/userActions';
import { isValidEmail, isValidPassword, nameValid } from '../utils';

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
  borderRadius: '20px',
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
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const checkIsNameValid = (name: string) => {
    nameValid(name) ? setNameError('') : setNameError('Min 2 symbols.');
  };
  const checkIsSurnameValid = (surname: string) => {
    nameValid(surname)
      ? setSurnameError('')
      : setSurnameError('Min 2 symbols.');
  };

  const handleEmailCheck = (email: string) => {
    isValidEmail(email) ? setEmailError('') : setEmailError('Like: mail@ml.lp');
  };

  const checkPassword = (password: string) => {
    isValidPassword(password)
      ? setPasswordError('')
      : setPasswordError('At least 4 symbols.');
  };

  const inputErrors = () => {
    return (
      user.name === '' ||
      user.surname === '' ||
      user.email === '' ||
      user.password === '' ||
      nameError !== '' ||
      surnameError !== '' ||
      emailError !== '' ||
      passwordError !== ''
    );
  };

  const closeModal = () => {
    setUser(initialUser);
    if (showPass) {
      switchShowPass();
    }
    switchOpen();
    setNameError('');
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
              <FormControl error={nameError !== ''}>
                <InputLabel htmlFor='name-input'>Name</InputLabel>
                <OutlinedInput
                  id='name-input'
                  label='Name'
                  value={user.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    setUser({ ...user, name });
                    checkIsNameValid(name);
                  }}
                />
                <FormHelperText>{nameError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl error={surnameError !== ''}>
                <InputLabel htmlFor='surname-input'>Surname</InputLabel>
                <OutlinedInput
                  id='surname-input'
                  label='Surname'
                  autoComplete='off'
                  onChange={(event) => {
                    const surname = event.target.value;
                    setUser({ ...user, surname });
                    checkIsSurnameValid(surname);
                  }}
                />
                <FormHelperText>{surnameError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl error={emailError !== ''}>
                <InputLabel htmlFor='email-input'>Email</InputLabel>
                <OutlinedInput
                  autoComplete='off'
                  id='email-input'
                  label='Email'
                  onChange={(event) => {
                    const email = event.target.value;
                    setUser({ ...user, email });
                    handleEmailCheck(email);
                  }}
                />
                <FormHelperText>{emailError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl error={passwordError !== ''}>
                <InputLabel htmlFor='pass-input'>Password</InputLabel>
                <OutlinedInput
                  autoComplete='off'
                  id='pass-input'
                  label='Password'
                  onChange={(event) => {
                    const password = event.target.value;
                    setUser({ ...user, password });
                    checkPassword(password);
                  }}
                  value={user.password}
                  type={showPass ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={switchShowPass}
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ background: 'WhiteSmoke' }}
                />
                <FormHelperText>{passwordError}</FormHelperText>
              </FormControl>
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
          <IconButton
            color='success'
            disabled={inputErrors()}
            onClick={addUser}
          >
            <AddBoxIcon fontSize='large' />
          </IconButton>
          <IconButton color='success' onClick={closeModal}>
            <CancelIcon fontSize='large' />
          </IconButton>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
