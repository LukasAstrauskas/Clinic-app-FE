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
import React from 'react';

type RenderAddNewPhysicianModalProps = {
  open: boolean;
  handleClose: () => void;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  firstNameError: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  lastNameError: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordError: string;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleFirstNameCheck: () => void;
  handleLastNameCheck: () => void;
  handleEmailCheck: () => void;
  handlePasswordCheck: () => void;
  occupations: {
    value: string;
    label: string;
  }[];
  modalStyle: React.CSSProperties;
  textFieldStyle: React.CSSProperties;
};

const RenderAddNewPhysicianModal = (props: RenderAddNewPhysicianModalProps) => {
  const {
    open,
    handleClose,
    setFirstName,
    firstNameError,
    setLastName,
    lastNameError,
    setEmail,
    emailError,
    setPassword,
    passwordError,
    showPassword,
    handleClickShowPassword,
    handleSubmit,
    handleFirstNameCheck,
    handleLastNameCheck,
    handleEmailCheck,
    handlePasswordCheck,
    occupations,
    modalStyle,
    textFieldStyle,
  } = props;

  return (
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
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={handleFirstNameCheck}
              helperText={firstNameError === '' ? 'First name' : firstNameError}
              error={firstNameError !== ''}
            />
            <TextField
              sx={textFieldStyle}
              id='last-name'
              placeholder='Last name'
              variant='outlined'
              onChange={(e) => setLastName(e.target.value)}
              onBlur={handleLastNameCheck}
              helperText={lastNameError === '' ? 'Last name' : lastNameError}
              error={lastNameError !== ''}
            />
            <TextField
              sx={textFieldStyle}
              id='email'
              placeholder='Email'
              variant='outlined'
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
                      <Visibility />
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
              {occupations.map((option) => (
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
  );
};
export default RenderAddNewPhysicianModal;
