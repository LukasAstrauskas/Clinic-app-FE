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
import {
  selectUser,
  updateUser,
  fetchUserById,
} from '../../store/slices/user/userSlice';
import {
  fetchOccupations,
  selectOccupations,
} from '../../store/slices/occupation/occupationSlice';
import {
  fetchPhysicianById,
  updatePhysician,
} from '../../store/slices/physician/editedPhysicianSlice';
import { selectPhysician } from '../../store/slices/physician/physicianSlice';

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
  selectedId: string;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const EditUserModal = ({
  open,
  setOpen,
  selectedId: id,
  setRefresh,
  refresh,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(selectUser);
  const selectedPhysician = useSelector(selectPhysician);
  const occupations = useSelector(selectOccupations);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedOccupationId, setSelectedOccupationId] = useState('');

  const handleFetchUserById = () => {
    if (selectedUser) {
      const fullUserName = selectedUser.name.split(' ');

      setFirstName(fullUserName[0]);
      setLastName(fullUserName[1]);
      setEmail(selectedUser.email);
      setType(selectedUser.type);
    }
  };

  const handleFetchPhysicianById = () => {
    if (selectedPhysician) {
      const fullPhysicianName = selectedPhysician.name.split(' ');

      setFirstName(fullPhysicianName[0]);
      setLastName(fullPhysicianName[1]);
      setEmail(selectedPhysician.email);
      setSelectedOccupationId(selectedPhysician.occupation.id);
    }
  };

  const handleUpdateUserById = async () => {
    if (selectedPhysician && type === 'physician') {
      const updatedPhysician = {
        id: selectedPhysician.id,
        name: firstName + ' ' + lastName,
        email,
        type,
        password,
        occupationId: selectedOccupationId,
      };
      await dispatch(updatePhysician(updatedPhysician));
    } else if (selectedUser) {
      const updatedUser = {
        id: selectedUser.id,
        name: firstName + ' ' + lastName,
        email,
        password,
        type,
      };
      dispatch(updateUser(updatedUser));
    }
    setRefresh(!refresh);
    handleClose();
  };

  const handleClose = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');

    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');

    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    handleFetchPhysicianById();
  }, [selectedPhysician]);

  useEffect(() => {
    if (!open) {
      return;
    }
    handleFetchUserById();
  }, [selectedUser]);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (type === 'physician') {
      dispatch(fetchOccupations());
      dispatch(fetchPhysicianById(id));
    }
    dispatch(fetchUserById(id));
  }, [type, open, dispatch]);

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
            {type === 'physician' ? 'Modify Physician' : 'Modify User'}
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
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value.trim());
                handleFirstNameCheck(e.target.value);
              }}
              helperText={firstNameError === '' ? 'First Name' : firstNameError}
              error={firstNameError !== ''}
            />
            <TextField
              sx={Styles.textField}
              id='lastName'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value.trim());
                handleLastNameCheck(e.target.value);
              }}
              helperText={lastNameError === '' ? 'Last Name' : lastNameError}
              error={lastNameError !== ''}
              style={{ marginLeft: '20px' }}
            />

            <TextField
              sx={Styles.textField}
              id='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleEmailCheck(e.target.value);
              }}
              helperText={emailError === '' ? 'Email' : emailError}
              error={emailError !== ''}
            />
            <TextField
              sx={Styles.textField}
              id='password'
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value.trim());
                handlePasswordCheck(e.target.value);
              }}
              style={{ marginLeft: '20px' }}
              helperText={passwordError === '' ? 'Password' : passwordError}
              error={passwordError !== ''}
            ></TextField>
            {type === 'physician' && (
              <TextField
                sx={Styles.textField}
                id='occupation'
                value={selectedOccupationId}
                select
                variant='outlined'
                helperText='Occupation'
                onChange={(e) => setSelectedOccupationId(e.target.value)}
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
