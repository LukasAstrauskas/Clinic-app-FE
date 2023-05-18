import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import {
  updatePatientInfo,
  selectPatientAdditionalInfo,
} from '../../store/slices/patient/patientSlice';
import { selectId } from '../../store/slices/auth/authSlice';
import Styles from '../../components/styles/UserManagmentStyles';

const PatientContactInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const patientInfo = useSelector(selectPatientAdditionalInfo);
  const userId = useSelector(selectId);
  const [gender, setGender] = useState(
    patientInfo !== null ? patientInfo.gender : '',
  );
  const [birthDate, setBirthDate] = useState(
    patientInfo !== null ? patientInfo.birthDate : null,
  );
  const [phone, setPhone] = useState(
    patientInfo !== null ? patientInfo.phone.toString() : '',
  );
  const [street, setStreet] = useState(
    patientInfo !== null ? patientInfo.street : '',
  );
  const [city, setCity] = useState(
    patientInfo !== null ? patientInfo.city : '',
  );
  const [postalCode, setPostalCode] = useState(
    patientInfo !== null ? patientInfo.postalCode : '',
  );
  const [country, setCountry] = useState(
    patientInfo !== null ? patientInfo.country : '',
  );
  const [emergencyName, setEmergencyName] = useState(
    patientInfo !== null ? patientInfo.emergencyName : '',
  );
  const [emergencySurname, setEmergencySurname] = useState(
    patientInfo !== null ? patientInfo.emergencyLastName : '',
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    patientInfo !== null ? patientInfo.emergencyPhone.toString() : '',
  );
  const [emergencyRelation, setEmergencyRelation] = useState(
    patientInfo !== null ? patientInfo.emergencyRelation : '',
  );

  const handleUpdatePatientInfo = () => {
    dispatch(
      updatePatientInfo({
        userId: userId,
        gender: gender,
        birthDate: birthDate,
        phone: +phone,
        street: street,
        city: city,
        postalCode: postalCode,
        country: country,
        emergencyName: emergencyName,
        emergencyLastName: emergencySurname,
        emergencyPhone: +emergencyPhone,
        emergencyRelation: emergencyRelation,
      }),
    );
  };
  const handlePhoneError = (phoneStr: string) => {
    if (
      (phoneStr.startsWith('3706') &&
        phoneStr.length === 11 &&
        /^\d+$/.test(phoneStr)) ||
      phoneStr === '' ||
      phoneStr === '0'
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleBirthDate = (date: Date | null) => {
    if (date === null) {
      return false;
    }
    const currentDate = new Date();
    if (
      isNaN(new Date(date).getTime()) ||
      new Date(date) >= currentDate ||
      new Date(date).getFullYear() < currentDate.getFullYear() - 150
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Box
      component='form'
      sx={{
        margin: 'auto',
        marginBottom: '2%',
        width: '60%',
        '& .MuiTextField-root': { m: 1, width: '47%' },
      }}
      noValidate
      autoComplete='off'
    >
      <h1>{sessionStorage.getItem('name')}</h1>
      <h2>Main information</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('gender')}
          helperText='Gender'
          onChange={(e) => setGender(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('birthDate')}
          helperText='Birth Date'
          onChange={(e) => setBirthDate(new Date(e.target.value))}
          error={handleBirthDate(birthDate)}
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('phone')}
          helperText='Phone Number'
          onChange={(e) => setPhone(e.target.value)}
          error={handlePhoneError(phone)}
          placeholder='3706...'
        />
      </div>
      <h2>Address</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('street')}
          helperText='Street'
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('city')}
          helperText='City'
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('postalCode')}
          helperText='Postal Code'
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('country')}
          helperText='Country'
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <h2>Emergency Contact</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('emergencyName')}
          helperText='First Name'
          onChange={(e) => setEmergencyName(e.target.value)}
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('emergencyLastName')}
          helperText='Last Name'
          onChange={(e) => setEmergencySurname(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          // value={emergencyPhone === '0' ? '' : emergencyPhone}
          defaultValue={sessionStorage.getItem('emergencyPhone')}
          helperText='Phone Number'
          onChange={(e) => setEmergencyPhone(e.target.value)}
          error={handlePhoneError(emergencyPhone)}
          placeholder='3706...'
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={sessionStorage.getItem('emergencyRelation')}
          helperText='Relation'
          onChange={(e) => setEmergencyRelation(e.target.value)}
        />
      </div>
      <div>
        <Box textAlign='center' marginTop={2}>
          <Button
            variant='contained'
            onClick={handleUpdatePatientInfo}
            sx={Styles.createNewUserBtn}
            disabled={
              handlePhoneError(phone) ||
              handlePhoneError(emergencyPhone) ||
              handleBirthDate(birthDate)
            }
          >
            save information
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default PatientContactInfo;
