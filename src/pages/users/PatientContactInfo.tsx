import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { fetchUserById, selectUser } from '../../store/slices/user/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';
import store from '../../store/store';
interface PatientData {
  firstName: string | undefined;
  lastName: string | undefined;
  gender: string;
  birthDate: string;
  phone: string;
}

interface AddressData {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface EmergencyContactData {
  firstName: string;
  lastName: string;
  phone: string;
  relation: string;
}

const PatientContactInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  if (store.getState().auth.isLoggedIn)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(fetchUserById(store.getState().auth.id!));
  return (
    <Box
      component='form'
      sx={{
        margin: 'auto',
        marginBottom: '5%',
        width: '50%',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <h2>Main information</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          //defaultValue={firstName}
          defaultValue={store.getState().user.user?.name}
          helperText='First name'
        />
        <TextField
          id='outlined-helper-text'
          //defaultValue={lastName}
          defaultValue={store.getState().user.user?.name}
          helperText='Last name'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          //defaultValue={gender}
          helperText='Gender'
        />
        <TextField
          id='outlined-helper-text'
          //defaultValue={birthDate}
          helperText='Birth Date'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          //defaultValue={phone}
          helperText='Phone Number'
        />
      </div>
      <h2>Address</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          //defaultValue={street}
          helperText='Street'
        />
        <TextField
          id='outlined-helper-text'
          //defaultValue={city}
          helperText='City'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          //defaultValue={postalCode}
          helperText='Postal Code'
        />
        <TextField
          id='outlined-helper-text'
          //defaultValue={country}
          helperText='Country'
        />
      </div>
      <h2>Emergency Contact</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          //defaultValue={emergencyFirstName}
          helperText='First Name'
        />
        <TextField
          id='outlined-helper-text'
          //defaultValue={emergencyLastName}
          helperText='Last Name'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          //defaultValue={emergencyPhone}
          helperText='Phone Number'
        />
        <TextField
          id='outlined-helper-text'
          //defaultValue={emergencyRelation}
          helperText='Relation'
        />
      </div>
      <div>
        <Box textAlign='right' sx={{ marginRight: '9%' }}>
          <Button variant='contained'>save information</Button>
        </Box>
      </div>
    </Box>
  );
};

export default PatientContactInfo;
