import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Visibility } from '@mui/icons-material';

// change to data from backend.
const Occupations = [
  {
    value: '1',
    label: 'Dentist',
  },
  {
    value: '2',
    label: 'GP',
  },
  {
    value: '3',
    label: 'Otolaryngologist',
  },
  {
    value: '4',
    label: 'Neurologist',
  },
];
type Physician = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  occupation: string;
};
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #D3D3D3',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  '& .physiciansModalForm': {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};
const textFieldStyle = {
  width: '46%',
  '& .MuiInputBase-root': {
    background: '#ededed',
  },
  '& .MuiFormHelperText-root': {
    minHeight: '40px',
  },
  '& .MuiInputLabel-root': {
    color: '#28cdcb',
    marginTop: '0.8rem',
  },
  '& .css-14lo706': {
    width: '0px',
  },
};
export default function AddNewPhysicianModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [physicians, setPhysicians] = useState<Physician[]>([]);

  const handleOpen = () => {
    setShowPassword(false);
    setOpen(true);
    setEmailError('');
    setPasswordError('');
    setPassword('');
    setEmail('');
  };
  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidPassword(password: string) {
    return (
      password.length >= 8 && /[a-z]/i.test(password) && /[0-9]/.test(password)
    );
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (emailError === '' && passwordError === '') {
      const firstNameInput = document.getElementById(
        'first-name',
      ) as HTMLInputElement;
      const lastNameInput = document.getElementById(
        'last-name',
      ) as HTMLInputElement;
      const occupationInput = document.getElementById(
        'occupation',
      ) as HTMLInputElement;
      const newPhysician: Physician = {
        firstName: firstNameInput?.value || '',
        lastName: lastNameInput?.value || '',
        email: email,
        password: password,
        occupation: occupationInput?.value || '',
      };
      setPhysicians([...physicians, newPhysician]);
      handleClose();
    }
  };

  const handleEmailCheck = () => {
    if (!isValidEmail(email)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };
  const handlePasswordCheck = () => {
    if (isValidPassword(password)) {
      setPasswordError('');
    } else {
      setPasswordError(
        'Password requires 1 letter, 1 number, and be 8+ characters.',
      );
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>
        Manage Physicians
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            sx={{
              textAlign: 'center',
              paddingBottom: '30px',
              fontWeight: 'bold',
            }}
            variant='h5'
            component='h2'
          >
            Add new physician
          </Typography>
          <Box>
            <form className='physiciansModalForm' onSubmit={handleSubmit}>
              <TextField
                sx={textFieldStyle}
                id='first-name'
                placeholder='First name'
                variant='outlined'
                helperText='First name'
              />
              <TextField
                sx={textFieldStyle}
                id='last-name'
                placeholder='Last name'
                variant='outlined'
                helperText='Last name'
              />
              <TextField
                sx={textFieldStyle}
                id='email'
                placeholder='Email'
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailCheck}
                helperText={emailError === '' ? 'Email' : emailError}
                error={emailError !== ''}
              />
              <TextField
                sx={textFieldStyle}
                id='password'
                placeholder='Password'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordCheck}
                helperText={
                  passwordError === '' ? 'Initial password' : passwordError
                }
                error={passwordError !== ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword}>
                        <Visibility></Visibility>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                sx={textFieldStyle}
                id='occupation'
                select
                label='Occupation'
                variant='outlined'
                helperText='Select physician Occupation'
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                {Occupations.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <Box sx={{ paddingLeft: '60%' }}>
                <Button
                  sx={{
                    marginRight: '10px',
                    color: 'orange',
                    borderColor: 'lightGray',
                  }}
                  variant='outlined'
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#28cdcb',
                  }}
                  variant='contained'
                  type='submit'
                >
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
