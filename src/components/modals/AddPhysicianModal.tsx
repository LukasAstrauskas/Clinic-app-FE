import { Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, FC } from 'react';
import Styles from '../styles/UserManagmentStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import { selectOccupations } from '../../store/slices/occupation/occupationSlice';
import {
  createPhysician,
  fetchPhysicians,
} from '../../store/slices/physician/physicianSlice';
import {
  isValidName,
  isValidLastName,
  isValidPassword,
  isValidEmail,
  isValidOccupation,
} from '../utils';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const PhysicianModal: FC<Props> = ({ setOpen, open }) => {
  const occupations = useSelector(selectOccupations);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [duplicationError, setDuplicationError] = useState(false);
  const [occupationId, setOccupationId] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setOccupationError(false);
    setDuplicationError(false);
  };

  const handleCreate = async () => {
    setOccupationError(occupationId === '');
    if (
      !nameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !occupationError &&
      occupationId
    ) {
      await dispatch(
        createPhysician({
          name: name + ' ' + lastName,
          email: email,
          password: password,
          occupationId: occupationId,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(fetchPhysicians());
          setOpen(false);
        })
        .catch(() => {
          setDuplicationError(true);
        });
    }
  };

  const handleNameErrors = (name: string) => {
    !isValidName(name) ? setNameError(true) : setNameError(false);
  };

  const handleLastNameErrors = (name: string) => {
    !isValidLastName(name) ? setLastNameError(true) : setLastNameError(false);
  };

  const handlePasswordErrors = (name: string) => {
    !isValidPassword(name) ? setPasswordError(true) : setPasswordError(false);
  };

  const handleEmailErrors = (email: string) => {
    !isValidEmail(email) ? setEmailError(true) : setEmailError(false);
    setDuplicationError(false);
  };

  const handleOccupationErrors = (occupation: string) => {
    !isValidOccupation(occupation)
      ? setOccupationError(true)
      : setOccupationError(false);
  };

  const isInputsValid = () => {
    return (
      !nameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !occupationError &&
      name &&
      lastName &&
      email &&
      password
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={Styles.modal}>
        <Typography align='center' sx={Styles.typography} variant='h5'>
          Add new physician
        </Typography>
        <Box>
          <Box sx={Styles.box}>
            <TextField
              sx={Styles.textField}
              onChange={(e) => {
                setName(e.target.value);
                handleNameErrors(e.target.value);
              }}
              label='First name'
              id='new-patient-name-field'
              helperText={
                nameError && (
                  <>First name length between 3 and 20 symbols, letters only</>
                )
              }
              error={nameError}
            />
            <TextField
              sx={Styles.textField}
              onChange={(e) => {
                setLastName(e.target.value);
                handleLastNameErrors(e.target.value);
              }}
              error={lastNameError}
              helperText={
                lastNameError && (
                  <>Last name length between 3 and 20 symbols, letters onl</>
                )
              }
              id='new-patient-LastName-field'
              label='Last name'
              style={{ marginLeft: '20px' }}
            />
          </Box>

          <Box sx={Styles.box}>
            <TextField
              sx={Styles.textField}
              label='Email'
              id='new-patient-email-field'
              onChange={(e) => {
                setEmail(e.target.value);
                handleEmailErrors(e.target.value);
              }}
              error={emailError || duplicationError}
              helperText={
                (emailError && <>Incorrect email format</>) ||
                (duplicationError && <>Email already taken</>)
              }
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
                handlePasswordErrors(e.target.value);
              }}
              id='new-patient-password-field'
              type={showPassword ? 'text' : 'password'}
              helperText={
                passwordError && <>Password length between 8 and 20 symbols</>
              }
              error={passwordError}
              label='Temporary password'
              sx={Styles.textField}
              style={{ marginLeft: '20px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      <Visibility></Visibility>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={Styles.box}>
            <TextField
              helperText={
                occupationError ? (
                  <>Occupation cannot be empty</>
                ) : (
                  <>Select physician Occupation</>
                )
              }
              error={occupationError}
              onChange={(e) => {
                setOccupationId(e.target.value);
                handleOccupationErrors(e.target.value);
              }}
              sx={Styles.textField}
              id='occupation'
              select
              label='Occupation'
              variant='outlined'
              SelectProps={{ native: true }}
              InputLabelProps={{ shrink: true }}
            >
              <option></option>

              {occupations.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </Box>
          <Box sx={{ paddingLeft: '60%' }}>
            <Button
              sx={Styles.cancelButton}
              variant='outlined'
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={Styles.createButton}
              variant='contained'
              type='submit'
              onClick={handleCreate}
              disabled={!isInputsValid()}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default PhysicianModal;
