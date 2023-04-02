import React, { useState, FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Modal, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Visibility } from '@mui/icons-material';
import axios from 'axios';
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const AddAdminModal: FC<Props> = ({ setOpen, open }) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [duplicationError, setduplicationError] = useState(false);

  const postRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const postRequestUrl = 'http://localhost:8080/user/admins';

  const textFieldStyle = {
    width: '47%',
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
  };

  const modalStyle = {
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
  };

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
  };

  const fixDuplicationError = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setduplicationError(false);
  };

  const handleCreate = async () => {
    setNameError(name === '');
    setLastNameError(lastName === '');
    setEmailError(!/\S+@\S+\.\S+/.test(email));
    setPasswordError(password === '');
    if (
      name != '' &&
      lastName != '' &&
      /\S+@\S+\.\S+/.test(email) &&
      password != '' &&
      !nameError &&
      !LastNameError &&
      !emailError &&
      !passwordError
    ) {
      await axios.post(
        postRequestUrl,
        {
          name: (name || '') + ' ' + (lastName || ''),
          email: email || '',
          password: password || '',
        },
        {
          headers: postRequestHeaders,
        },
      );

      setOpen(false);
      setName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
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
          Add new admins
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
            onBlur={(e) => setNameError(e.target.value === '')}
            onChange={(e) => setName(e.target.value)}
            label='First name'
            id='new-admin-name-field'
            helperText={nameError && <>Name cannot be empty</>}
            error={nameError}
          />
          <TextField
            sx={textFieldStyle}
            onBlur={(e) => setLastNameError(e.target.value === '')}
            onChange={(e) => setLastName(e.target.value)}
            error={LastNameError}
            helperText={LastNameError && <>Last name cannot be empty</>}
            id='new-admin-LastName-field'
            label='Last name'
            style={{ marginLeft: '20px' }}
          />
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
            label='Email'
            id='new-admin-email-field'
            onChange={fixDuplicationError}
            onBlur={(e) => setEmailError(!/\S+@\S+\.\S+/.test(e.target.value))}
            error={emailError || duplicationError}
            helperText={
              (emailError && <>Incorrect email format</>) ||
              (duplicationError && <>Email already taken</>)
            }
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPasswordError(e.target.value === '')}
            id='new-admin-password-field'
            type={showPassword ? 'text' : 'password'}
            helperText={passwordError && <>password cannot be empty</>}
            error={passwordError}
            label='Temporary password'
            sx={textFieldStyle}
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
  );
};

export default AddAdminModal;
