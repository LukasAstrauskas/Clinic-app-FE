import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
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
};
const textFieldBoxStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};
const textFieldStyle = {
  width: '46%',
  margin: '2%',
  '& .MuiInputBase-root': {
    background: 'lightgray',
  },
  '& .MuiInputLabel-root': {
    color: '#9a9a9a',
    fontSize: '25px',
    marginTop: '1.5rem',
  },
  '& .css-14lo706': {
    ariaHidden: 'false',
  },
};
export default function AddNewPhysicianModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleOpen = () => {
    setShowPassword(false);
    setOpen(true);
    setEmailError('');
    setPasswordError('');
  };
  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidPassword(password: string) {
    const errors = [];
    if (password.length < 8) {
      errors.push('Your password must be at least 8 characters');
    }
    if (password.search(/[a-z]/i) < 0) {
      errors.push('Your password must contain at least one letter.');
    }
    if (password.search(/[0-9]/) < 0) {
      errors.push('Your password must contain at least one digit.');
    }
    if (errors.length > 0) {
      return false;
    }
    return true;
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (emailError === '' || passwordError === '') {
      console.log('Form works');
    } else {
      console.log('Form baad');
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
        'Password needs 1 letter, 1 number, and be 8+ characters.',
      );
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography sx={{ textAlign: 'center' }} variant='h4' component='h2'>
            Add new Physician
          </Typography>
          <Box sx={textFieldBoxStyle}>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={textFieldStyle}
                id='first-name'
                placeholder='Name'
                variant='outlined'
              />
              <TextField
                sx={textFieldStyle}
                id='last-name'
                placeholder='Last name'
                variant='outlined'
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
                <option value='' />
                {Occupations.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <Box>
                <Button type='submit'>Create</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
