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
import React, { useState, FC, useEffect } from 'react';
import axios from 'axios';
import Styles from '../styles/UserManagmentStyles';
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const PhysicianModal: FC<Props> = ({ setOpen, open }) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [duplicationError, setduplicationError] = useState(false);
  const [occupations, setOccupations] = useState<OccupationType[]>([]);
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
  };

  type OccupationType = {
    id: string;
    name: string;
  };

  useEffect(() => {
    const GetOccupationsRequestURL = 'http://localhost:8080/occupations';

    const GetOccupationsRequestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .get(GetOccupationsRequestURL, {
        headers: GetOccupationsRequestHeaders,
      })
      .then((res) => {
        setOccupations(res.data);
      });
  }, [open]);

  const postRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const postRequestUrl = 'http://localhost:8080/physicianInfo';

  const handleCreate = async () => {
    setNameError(name === '');
    setLastNameError(lastName === '');
    setEmailError(!/\S+@\S+\.\S+/.test(email));
    setPasswordError(password === '');
    setOccupationError(occupationId === '');
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
          occupationId: occupationId,
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
      setOccupationId('');
    }
  };

  const fixDuplicationError = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setduplicationError(false);
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
              onBlur={(e) => setNameError(e.target.value === '')}
              onChange={(e) => setName(e.target.value)}
              label='First name'
              id='new-patient-name-field'
              helperText={nameError && <>Name cannot be empty</>}
              error={nameError}
            />
            <TextField
              sx={Styles.textField}
              onBlur={(e) => setLastNameError(e.target.value === '')}
              onChange={(e) => setLastName(e.target.value)}
              error={LastNameError}
              helperText={LastNameError && <>Last name cannot be empty</>}
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
              onChange={fixDuplicationError}
              onBlur={(e) =>
                setEmailError(!/\S+@\S+\.\S+/.test(e.target.value))
              }
              error={emailError || duplicationError}
              helperText={
                (emailError && <>Incorrect email format</>) ||
                (duplicationError && <>Email already taken</>)
              }
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => setPasswordError(e.target.value === '')}
              id='new-patient-password-field'
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

          <Box sx={Styles.box}>
            <TextField
              helperText={
                occupationError ? (
                  <>Occupation cannot be empty</>
                ) : (
                  <>Select physician Occupation</>
                )
              }
              onBlur={(e) => setOccupationError(e.target.value === '')}
              error={occupationError}
              onChange={(e) => setOccupationId(e.target.value)}
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
