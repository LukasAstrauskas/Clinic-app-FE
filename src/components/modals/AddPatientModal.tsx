import React, { useState, FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Modal, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Visibility } from '@mui/icons-material';
import Styles from '../styles/UserManagmentStyles';
import {
  createPatient,
  fetchPatients,
} from '../../store/slices/patient/patientSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';
import {
  isValidName,
  isValidLastName,
  isValidPassword,
  isValidEmail,
} from '../utils';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const AddPatientModal: FC<Props> = ({ setOpen, open }) => {
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
  const [duplicationError, setDuplicationError] = useState(false);

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
    setDuplicationError(false);
  };

  const handleCreate = async () => {
    if (!nameError && !lastNameError && !emailError && !passwordError) {
      await dispatch(
        createPatient({
          name: name + ' ' + lastName,
          email: email,
          password: password,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(fetchPatients());
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

  const handleEmailErrors = (email: string) => {
    !isValidEmail(email) ? setEmailError(true) : setEmailError(false);
    setDuplicationError(false);
  };

  const handlePasswordErrors = (name: string) => {
    !isValidPassword(name) ? setPasswordError(true) : setPasswordError(false);
  };

  const isInputsValid = () => {
    return (
      !nameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      name &&
      lastName &&
      email &&
      password
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={Styles.modal}>
        <Typography variant='h5' align='center' sx={Styles.typography}>
          Add new patient
        </Typography>
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
                <>Last name length between 3 and 20 symbols, letters only</>
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
        <Box
          sx={{
            mt: 9,
            textAlign: 'right',
          }}
        >
          <Button sx={Styles.cancelButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={Styles.createButton}
            onClick={handleCreate}
            disabled={!isInputsValid()}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPatientModal;
