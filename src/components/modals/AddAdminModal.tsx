import React, { useState, FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Modal, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Visibility } from '@mui/icons-material';
import Styles from '../styles/UserManagmentStyles';
import { AppDispatch } from '../../store/types';
import { useDispatch } from 'react-redux';
import { createAdmin, fetchAdmins } from '../../store/slices/admin/adminSlice';
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const AddAdminModal: FC<Props> = ({ setOpen, open }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
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
    setNameError(name === '');
    setLastNameError(lastName === '');
    setEmailError(!/\S+@\S+\.\S+/.test(email));
    setPasswordError(password === '');
    if (
      name != '' &&
      lastName != '' &&
      /\S+@\S+\.\S+/.test(email) &&
      password != ''
    ) {
      await dispatch(
        createAdmin({
          name: name + ' ' + lastName,
          email: email,
          password: password,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(fetchAdmins());
          setOpen(false);
        })
        .catch(() => {
          setDuplicationError(true);
        });
    }
  };

  const handleEmailErrors = (event: string) => {
    setEmailError(!/\S+@\S+\.\S+/.test(event));
    setDuplicationError(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={Styles.modal}>
        <Typography sx={Styles.typography} variant='h5' align='center'>
          Add new admin
        </Typography>
        <Box sx={Styles.box}>
          <TextField
            sx={Styles.textField}
            onBlur={(e) => setNameError(e.target.value === '')}
            onChange={(e) => setName(e.target.value)}
            label='First name'
            id='new-admin-name-field'
            helperText={nameError && <>Name cannot be empty</>}
            error={nameError}
          />
          <TextField
            sx={Styles.textField}
            onBlur={(e) => setLastNameError(e.target.value === '')}
            onChange={(e) => setLastName(e.target.value)}
            error={LastNameError}
            helperText={LastNameError && <>Last name cannot be empty</>}
            id='new-admin-LastName-field'
            label='Last name'
            style={{ marginLeft: '20px' }}
          />
        </Box>

        <Box sx={Styles.box}>
          <TextField
            sx={Styles.textField}
            label='Email'
            id='new-admin-email-field'
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleEmailErrors(e.target.value)}
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
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddAdminModal;
