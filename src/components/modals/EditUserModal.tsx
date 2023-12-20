import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Grid, IconButton, InputAdornment, Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isValidName, isValidEmail, isValidPasswordOrEmpty } from '../utils';
import Styles from '../styles/UserManagmentStyles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchOccupations,
  selectOccupations,
} from '../../store/slices/occupation/occupationSlice';
import { User, UserDTO } from '../../model/Model';
import { updateUser } from '../../store/slices/users/userActions';
import { PHYSICIAN } from '../../utils/Users';
import EditIcon from '@mui/icons-material/Edit';
import { Visibility, VisibilityOff, Cancel } from '@mui/icons-material';
import useToggle from '../../hooks/useToggle';
import { setUser } from '../../store/slices/manage-users/userSlice';

interface Props {
  open?: boolean;
  switchOpen?: () => void;
  userToUpdate: User;
}

const EditUserModal = ({
  open = true,
  switchOpen = () => undefined,
  userToUpdate,
}: Props) => {
  const dispatch = useAppDispatch();
  const occupations = useAppSelector(selectOccupations);
  const { id, name, surname, email, type, occupation } = userToUpdate;

  const initialState: UserDTO = {
    id,
    name,
    surname,
    password: '',
    email,
    type,
    occupationId: occupation ? occupation.id : null,
  };

  const [userDTO, setUserDTO] = useState<UserDTO>(initialState);
  const [showPass, switchShowPass] = useToggle();

  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUpdateUser = async () => {
    dispatch(updateUser(userDTO));
    handleClose();
  };

  const handleClose = () => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    dispatch(setUser(null));
    switchOpen();
  };

  useEffect(() => {
    if (type === PHYSICIAN && occupations.length === 0) {
      dispatch(fetchOccupations());
    }
  }, []);

  const handleEmailCheck = (email: string) => {
    isValidEmail(email) ? setEmailError('') : setEmailError('Email is invalid');
  };

  const handleFirstNameCheck = (name: string) => {
    isValidName(name)
      ? setFirstNameError('')
      : setFirstNameError(
          'First name length between 2 and 20 symbols, letters only',
        );
  };

  const handleLastNameCheck = (name: string) => {
    isValidName(name)
      ? setLastNameError('')
      : setLastNameError('Surame must have at least 2 symbols.');
  };

  const handlePasswordCheck = (password: string) => {
    isValidPasswordOrEmpty(password)
      ? setPasswordError('')
      : setPasswordError('Must contain at least 4 characters.');
  };

  const isInputsValid = () => {
    return (
      firstNameError === '' &&
      lastNameError === '' &&
      emailError === '' &&
      passwordError === ''
    );
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={Styles.modal}>
          <Typography
            variant='h5'
            align='center'
            style={{
              marginTop: 30,
              fontWeight: '700',
            }}
          ></Typography>
          <Box
            sx={{
              width: '470px',
              m: 'auto',
              mt: '30px',
              scale: '90%',
            }}
          >
            <TextField
              sx={Styles.textField}
              id='firstName'
              value={userDTO.name}
              onChange={(e) => {
                const name = e.target.value;
                setUserDTO({ ...userDTO, name });
                handleFirstNameCheck(name);
              }}
              helperText={firstNameError === '' ? 'First Name' : firstNameError}
              error={firstNameError !== ''}
            />
            <TextField
              sx={Styles.textField}
              id='lastName'
              value={userDTO.surname}
              onChange={(e) => {
                setUserDTO({
                  ...userDTO,
                  surname: e.target.value.trim(),
                });
                handleLastNameCheck(e.target.value);
              }}
              helperText={lastNameError === '' ? 'Last Name' : lastNameError}
              error={lastNameError !== ''}
              style={{ marginLeft: '20px' }}
            />

            <TextField
              sx={Styles.textField}
              id='email'
              value={userDTO.email}
              onChange={(e) => {
                setUserDTO({
                  ...userDTO,
                  email: e.target.value.trim(),
                });
                handleEmailCheck(e.target.value);
              }}
              helperText={emailError === '' ? 'Email' : emailError}
              error={emailError !== ''}
            />
            <TextField
              sx={Styles.textField}
              id='password'
              type={showPass ? 'text' : 'password'}
              value={userDTO.password}
              onChange={(e) => {
                setUserDTO({
                  ...userDTO,
                  password: e.target.value.trim(),
                });
                handlePasswordCheck(e.target.value);
              }}
              style={{ marginLeft: '20px' }}
              helperText={passwordError === '' ? 'Password' : passwordError}
              error={passwordError !== ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={switchShowPass}>
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>

            {userToUpdate.type === 'physician' && (
              <TextField
                sx={Styles.textField}
                id='occupation'
                value={userDTO.occupationId}
                select
                variant='outlined'
                helperText='Occupation'
                onChange={(e) =>
                  setUserDTO({
                    ...userDTO,
                    occupationId: e.target.value,
                  })
                }
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                {occupations.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </TextField>
            )}
          </Box>

          <Grid
            container
            direction='row'
            justifyContent='space-evenly'
            alignItems='center'
          >
            <IconButton
              color='success'
              onClick={handleUpdateUser}
              disabled={!isInputsValid()}
            >
              <EditIcon fontSize='large' />
            </IconButton>
            <IconButton color='success' onClick={handleClose}>
              <Cancel fontSize='large' />
            </IconButton>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
export default EditUserModal;
