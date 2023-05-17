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
import { isValidName, isValidLastName, isValidPassword } from '../utils';

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
    setEmailError(!/\S+@\S+\.\S+/.test(email));
    if (
      !nameError &&
      !lastNameError &&
      /\S+@\S+\.\S+/.test(email) &&
      !passwordError
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

  const handleNameErrors = (name: string) => {
    !isValidName(name) ? setNameError(true) : setNameError(false);
  };

  const handleLastNameErrors = (name: string) => {
    !isValidLastName(name) ? setLastNameError(true) : setLastNameError(false);
  };

  const handlePasswordErrors = (name: string) => {
    !isValidPassword(name) ? setPasswordError(true) : setPasswordError(false);
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
            onBlur={(e) => handleNameErrors(e.target.value)}
            onChange={(e) => setName(e.target.value)}
            label='First name'
            id='new-admin-name-field'
            helperText={
              nameError && <>First name length between 3 and 20 symbols</>
            }
            error={nameError}
          />
          <TextField
            sx={Styles.textField}
            onBlur={(e) => handleLastNameErrors(e.target.value)}
            onChange={(e) => setLastName(e.target.value)}
            error={lastNameError}
            helperText={
              lastNameError && <>Last name length between 3 and 20 symbols</>
            }
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
            onBlur={(e) => handlePasswordErrors(e.target.value)}
            id='new-admin-password-field'
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
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddAdminModal;
