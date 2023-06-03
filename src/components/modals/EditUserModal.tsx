import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isValidName, isValidEmail, isValidPasswordOrEmpty } from '../utils';
import Styles from '../styles/UserManagmentStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import { updateUser } from '../../store/slices/user/userSlice';
import {
  fetchOccupations,
  selectOccupations,
} from '../../store/slices/occupation/occupationSlice';
import { CreateUserDTO, UpdateUserDTO } from '../../model/Model';

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
  id: string;
  userToUpdate: CreateUserDTO;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const EditUserModal = ({
  open,
  setOpen,
  id,
  userToUpdate,
  setRefresh,
  refresh,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const occupations = useSelector(selectOccupations);

  const initialState: CreateUserDTO = {
    name: '',
    surname: '',
    email: '',
    password: '',
    type: '',
    infoID: undefined,
  };
  const [userDTO, setUserDTO] = useState<CreateUserDTO>(initialState);

  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUpdateUserById = async () => {
    const updatedUserDTO: UpdateUserDTO = {
      id: id,
      userDTO: userDTO,
    };

    await dispatch(updateUser(updatedUserDTO));

    setRefresh(!refresh);
    handleClose();
  };

  const handleClose = () => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');

    setUserDTO(initialState);

    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      if (userToUpdate.type === 'physician' && occupations.length === 0) {
        alert(`Get occupations`);
        dispatch(fetchOccupations());
      }
      setUserDTO(userToUpdate);
    }
  }, [open, dispatch]);

  const handleEmailCheck = (email: string) => {
    isValidEmail(email) ? setEmailError('') : setEmailError('Email is invalid');
  };

  const handleFirstNameCheck = (name: string) => {
    isValidName(name)
      ? setFirstNameError('')
      : setFirstNameError(
          'First name length between 3 and 20 symbols, letters only',
        );
  };

  const handleLastNameCheck = (name: string) => {
    isValidName(name)
      ? setLastNameError('')
      : setLastNameError(
          'First name length between 3 and 20 symbols, letters only',
        );
  };

  const handlePasswordCheck = (password: string) => {
    isValidPasswordOrEmpty(password)
      ? setPasswordError('')
      : setPasswordError(
          'Password requires 1 letter, 1 number, and must be at least 8 characters long',
        );
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
          >
            {userToUpdate.type === 'physician'
              ? 'Modify Physician'
              : 'Modify User'}
            <p>Name: {userDTO.name}.</p>
            <p>Surname: {userDTO.surname}.</p>
            <p>Type: {userDTO.type}.</p>
            <p>InfoID: {userDTO.infoID}.</p>
          </Typography>
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
                setUserDTO({
                  ...userDTO,
                  name: e.target.value.trim(),
                });
                handleFirstNameCheck(e.target.value);
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
              type='password'
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
            ></TextField>
            {userToUpdate.type === 'physician' && (
              <TextField
                sx={Styles.textField}
                id='occupation'
                value={userDTO.infoID}
                select
                variant='outlined'
                helperText='Occupation'
                onChange={(e) =>
                  setUserDTO({
                    ...userDTO,
                    infoID: e.target.value,
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

          <Box
            sx={{
              mt: 9,
              textAlign: 'right',
            }}
          >
            <Button
              sx={{
                border: '1px solid orange',
                color: 'orange',
                '&:hover': {
                  color: 'orange',
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              sx={{
                marginLeft: 3,
                bgcolor: '#25ced1',
                '&:hover': {
                  bgcolor: '#25ced1',
                },
              }}
              disabled={!isInputsValid()}
              onClick={handleUpdateUserById}
            >
              Modify
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default EditUserModal;
