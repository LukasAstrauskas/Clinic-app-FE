import React, { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { isEmailValid } from '../utils';

export default function AddingAdminModal() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const getRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const getRequestUrl = 'http://localhost:8080/user';
  const postRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const postRequestUrl = 'http://localhost:8080/user/add-admins';

  const textFieldStyle = {
    width: '47%',
    '& .MuiInputBase-root': {
      background: '#ededed',
    },
    '& .MuiFormHelperText-root': {
      minHeight: '40px',
    },
  };
  const modalStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 550,
      bgcolor: 'white',
      border: '2px solid #D3D3D3',
      borderRadius: '20px',
      boxShadow: 24,
      p: 4,
    }),
    [],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        await axios.get(getRequestUrl, {
          headers: getRequestHeaders,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleOpen = () => {
    setPassword('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setEmailError('');
    setOpen(true);
  };

  const handleEmailCheck = () => {
    !isEmailValid(email)
      ? setEmailError('Email is invalid')
      : setEmailError('');
  };

  const handleClose = () => {
    setOpen(false);
    setEmailError('');
  };

  const handleCreate = async () => {
    if (emailError === '') {
      await axios.post(
        postRequestUrl,
        {
          full_name: (firstName || '') + ' ' + (lastName || ''),
          email: email || '',
          password: password || '',
          role: 'ADMIN',
        },
        {
          headers: postRequestHeaders,
        },
      );
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          ml: 5,
          mb: 3,
          scale: '90%',
          bgcolor: '#25ced1',
          '&:hover': {
            bgcolor: '#25ced1',
          },
        }}
        variant='contained'
      >
        Create new Admin
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant='h5'
            align='center'
            style={{
              marginTop: 30,
              fontWeight: '700',
            }}
          >
            Add a new Admin
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
              sx={textFieldStyle}
              helperText='First name'
              id='first-name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></TextField>
            <TextField
              sx={textFieldStyle}
              id='last-name'
              helperText='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ marginLeft: '20px' }}
            ></TextField>
          </Box>

          <Box
            sx={{
              width: '470px',
              m: 'auto',
              mt: '30px',
              scale: '90%',
            }}
          >
            <TextField
              sx={textFieldStyle}
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailCheck}
              helperText={emailError === '' ? 'Email' : emailError}
              error={emailError !== ''}
            ></TextField>
            <TextField
              id='password'
              type='password'
              helperText='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={textFieldStyle}
              style={{ marginLeft: '20px' }}
            ></TextField>
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
              onClick={handleCreate}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
