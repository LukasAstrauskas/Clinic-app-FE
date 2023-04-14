import React, { useMemo, useState, useEffect, FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { isValidName, isValidEmail, isValidPassword } from '../utils';
import Styles from '../styles/UserManagmentStyles';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  type: string;
};

type Occupation = {
  id: string;
  name: string;
};

type Physician = {
  id: string;
  name: string;
  email: string;
  password: string;
  type: string;
  occupation: {
    id: string;
    name: string;
  };
};

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  selectedId: string;
}

const EditUserModal: FC<Props> = ({ open, setOpen, selectedId }) => {
  const [user, setUser] = useState<User>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [occupationId, setOccupationId] = useState('');
  const [occupationName, setOccupationName] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const id = selectedId;
  // const id = 'e89e027e-cb1f-11ed-afa1-0242ac120002';
  console.log(selectedId);

  const postRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const usersUrl = `http://localhost:8080/user/`;
  const occupationsUrl = `http://localhost:8080/occupations`;
  const physicianUrl = `http://localhost:8080/physicianInfo/`;

  const fetchUserById = async () => {
    const response = await axios
      .get<User>(usersUrl + `${id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setType(response.data.type);
      })
      .catch((err) => console.log('Err', err));
  };

  console.log(name);

  const fetchPhysicianById = async () => {
    const response = await axios
      .get<Physician>(physicianUrl + `${id}`)
      .then((response) => {
        setOccupationId(response.data.occupation.id);
        setOccupationName(response.data.occupation.name);
      })
      .catch((err) => console.log('Err', err));
  };

  const fetchOccupations = async () => {
    const response = await axios
      .get<Occupation, any>(occupationsUrl)
      .then((response) => {
        setOccupations(response.data);
      })
      .catch((err) => console.log('Err', err));
  };

  const updateUserById = async () => {
    if (!emailError && !nameError && !passwordError) {
      const { data } = await axios.put<User>(
        usersUrl + `${id}`,
        {
          name: name,
          email: email,
          password: password,
          type: type,
        },
        {
          headers: postRequestHeaders,
        },
      );
      if (type === 'physician') {
        const { data } = await axios.put<Physician>(
          physicianUrl + `${id}`,
          {
            name: name,
            email: email,
            password: password,
            type: type,
            occupationId: occupationId,
          },
          {
            headers: postRequestHeaders,
          },
        );
        console.log(data);
      }
      setIsUpdated(true);
      setOpen(false);
      return data;
    }
    console.log('There are errors with update');
  };

  useEffect(() => {
    if (type === 'physician') {
      fetchOccupations();
      fetchPhysicianById();
    } else {
      fetchUserById();
    }
  }, [type]);

  const handleEmailCheck = () => {
    !isValidEmail(email)
      ? setEmailError('Email is invalid')
      : setEmailError('');
  };

  const handleNameCheck = () => {
    !isValidName(name)
      ? setNameError('Name can not be empty')
      : setNameError('');
  };

  const handlePasswordCheck = () => {
    !isValidPassword(password)
      ? setPasswordError(
          'Password requires 1 letter, 1 number, and must be at least 8 characters long',
        )
      : setPasswordError('');
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={Styles.modal}>
          <Typography
            variant='h5'
            align='center'
            style={{
              marginTop: 30,
              fontWeight: '700',
            }}
          >
            {type === 'physician' ? 'Modify Physician' : 'Modify User'}
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
              sx={Styles.textField}
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameCheck}
              helperText={nameError === '' ? 'Name' : nameError}
              error={nameError !== ''}
            />
            <TextField
              sx={Styles.textField}
              helperText='Type'
              id='type'
              value={type}
              style={{ marginLeft: '20px' }}
              disabled
            />

            <TextField
              sx={Styles.textField}
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailCheck}
              helperText={emailError === '' ? 'Email' : emailError}
              error={emailError !== ''}
            />
            <TextField
              sx={Styles.textField}
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordCheck}
              style={{ marginLeft: '20px' }}
              helperText={passwordError === '' ? 'Password' : passwordError}
              error={passwordError !== ''}
            ></TextField>
            {type === 'physician' && (
              <TextField
                sx={Styles.textField}
                id='occupation'
                value={occupationId}
                select
                variant='outlined'
                helperText='Occupation'
                onChange={(e) => setOccupationId(e.target.value)}
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                {occupations.map((occupation) => (
                  <option key={occupation.id} value={occupation.id}>
                    {occupation.name}
                  </option>
                ))}
              </TextField>
            )}
          </Box>
          {/* {isUpdated && (
            <h4 style={{ textAlign: 'center', color: 'green' }}>
              Successfully modified!
            </h4>
          )} */}
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
              onClick={updateUserById}
            >
              Modify
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default EditUserModal;
