import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';
import store from '../../store/store';
import { updatePatientInfo } from '../../store/slices/patient/patientInfoSlice';

const PatientContactInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = store.getState().auth.id;
  const [gender, setGender] = useState(
    store.getState().patientInfo.additionalInfo?.gender as string,
  );
  const [birthDate, setBirthDate] = useState(
    store.getState().patientInfo.additionalInfo?.birth_date as Date,
  );
  const [phone, setPhone] = useState(
    store.getState().patientInfo.additionalInfo?.phone as number,
  );
  const [street, setStreet] = useState(
    store.getState().patientInfo.additionalInfo?.street as string,
  );
  const [city, setCity] = useState(
    store.getState().patientInfo.additionalInfo?.city as string,
  );
  const [postalCode, setPostalCode] = useState(
    store.getState().patientInfo.additionalInfo?.postal_code as string,
  );
  const [country, setCountry] = useState(
    store.getState().patientInfo.additionalInfo?.country as string,
  );
  const [emergencyName, setEmergencyName] = useState(
    store.getState().patientInfo.additionalInfo?.emergency_name as string,
  );
  const [emergencySurname, setEmergencySurname] = useState(
    store.getState().patientInfo.additionalInfo?.emergency_surname as string,
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    store.getState().patientInfo.additionalInfo?.emergency_phone as number,
  );
  const [emergencyRelation, setEmergencyRelation] = useState(
    store.getState().patientInfo.additionalInfo?.emergency_relation as string,
  );
  const handleUpdatePatientInfo = () => {
    dispatch(
      updatePatientInfo({
        user_id: userId,
        gender: gender,
        birth_date: birthDate,
        phone: phone,
        street: street,
        city: city,
        postal_code: postalCode,
        country: country,
        emergency_name: emergencyName,
        emergency_surname: emergencySurname,
        emergency_phone: emergencyPhone,
        emergency_relation: emergencyRelation,
      }),
    );
  };
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
      <h1>{store.getState().auth.user?.name}</h1>
      <h2>Main information</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={gender}
          helperText='Gender'
          onChange={(e) => setGender(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={birthDate}
          helperText='Birth Date'
          onChange={(e) => setBirthDate(new Date(e.target.value))}
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={phone}
          value={phone === 0 ? '' : phone}
          helperText='Phone Number'
          onChange={(e) => setPhone(+e.target.value)}
        />
      </div>
      <h2>Address</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={street}
          helperText='Street'
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={city}
          helperText='City'
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={postalCode}
          helperText='Postal Code'
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={country}
          helperText='Country'
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <h2>Emergency Contact</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencyName}
          helperText='First Name'
          onChange={(e) => setEmergencyName(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencySurname}
          helperText='Last Name'
          onChange={(e) => setEmergencySurname(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencyPhone}
          value={emergencyPhone === 0 ? '' : emergencyPhone}
          helperText='Phone Number'
          onChange={(e) => setEmergencyPhone(+e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencyRelation}
          helperText='Relation'
          onChange={(e) => setEmergencyRelation(e.target.value)}
        />
      </div>
      <div>
        <Box textAlign='right' sx={{ marginRight: '9%' }}>
          <Button variant='contained' onClick={handleUpdatePatientInfo}>
            save information
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default PatientContactInfo;
