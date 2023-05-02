import React, { useState, useEffect, FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isValidName, isValidEmail, isValidPassword } from '../utils';
import Styles from '../styles/UserManagmentStyles';
import { EditUser } from '../../model/Model';
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

const EditUserModal: FC<EditUser> = ({ open, setOpen, selectedId: id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(selectUser);
  const selectedPhysician = useSelector(selectPhysician);
  const occupations = useSelector(selectOccupations);

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
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

  const handleUpdateUserById = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (selectedUser) {
      const updatedUser = {
        id: selectedUser.id,
        name: firstName + ' ' + lastName,
        email,
        password,
        type,
      };
      dispatch(updateUser(updatedUser));

      if (type === 'physician') {
        const updatedPhysician = {
          id: selectedUser.id,
          name: firstName + ' ' + lastName,
          email,
          type,
          password,
          occupationId: selectedOccupationId,
        };
        dispatch(updatePhysician(updatedPhysician));
      }
      setIsUpdated(true);
      window.location.reload();
    }
  };

  const handleClose = () => {
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

  const handleEmailCheck = () => {
    !isValidEmail(email)
      ? setEmailError('Email is invalid')
      : setEmailError('');
  };

  const handleNameCheck = () => {
    !isValidName(name)
      ? setNameError('Name can not be empty')
      : setNameError('');
  };

  const handlePasswordCheck = () => {
    !isValidPassword(password)
      ? setPasswordError(
          'Password requires 1 letter, 1 number, and must be at least 8 characters long',
        )
      : setPasswordError('');
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
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={handleNameCheck}
              helperText={nameError === '' ? 'First Name' : nameError}
              error={nameError !== ''}
            />
            <TextField
              sx={Styles.textField}
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={handleNameCheck}
              helperText={nameError === '' ? 'Last Name' : nameError}
              error={nameError !== ''}
              style={{ marginLeft: '20px' }}
            />

            <TextField
              sx={Styles.textField}
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailCheck}
              helperText={emailError === '' ? 'Email' : emailError}
              error={emailError !== ''}
            />
            <TextField
              sx={Styles.textField}
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordCheck}
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
          {isUpdated && (
            <h4 style={{ textAlign: 'center', color: 'green' }}>
              Successfully modified!
            </h4>
          )}
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
