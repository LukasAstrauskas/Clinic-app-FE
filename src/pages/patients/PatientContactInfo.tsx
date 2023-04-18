import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

interface PatientData {
  firstName: string;
  lastName: string;
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

interface Props {
  patientData: PatientData;
  addressData: AddressData;
  emergencyContactData: EmergencyContactData;
}

const PatientContactInfo: React.FC<Props> = ({
  patientData,
  addressData,
  emergencyContactData,
}) => {
  const [firstName, setFirstName] = useState(patientData.firstName);
  const [lastName, setLastName] = useState(patientData.lastName);
  const [gender, setGender] = useState(patientData.gender);
  const [birthDate, setBirthDate] = useState(patientData.birthDate);
  const [phone, setPhone] = useState(patientData.phone);
  const [street, setStreet] = useState(addressData.street);
  const [city, setCity] = useState(addressData.city);
  const [postalCode, setPostalCode] = useState(addressData.postalCode);
  const [country, setCountry] = useState(addressData.country);
  const [emergencyFirstName, setEmergencyFirstName] = useState(
    emergencyContactData.firstName,
  );
  const [emergencyLastName, setEmergencyLastName] = useState(
    emergencyContactData.lastName,
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    emergencyContactData.phone,
  );
  const [emergencyRelation, setEmergencyRelation] = useState(
    emergencyContactData.relation,
  );

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
          defaultValue={firstName}
          helperText='First name'
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={lastName}
          helperText='Last name'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={gender}
          helperText='Gender'
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={birthDate}
          helperText='Birth Date'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={phone}
          helperText='Phone Number'
        />
      </div>
      <h2>Address</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={street}
          helperText='Street'
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={city}
          helperText='City'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={postalCode}
          helperText='Postal Code'
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={country}
          helperText='Country'
        />
      </div>
      <h2>Emergency Contact</h2>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencyFirstName}
          helperText='First Name'
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencyLastName}
          helperText='Last Name'
        />
      </div>
      <div>
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencyPhone}
          helperText='Phone Number'
        />
        <TextField
          id='outlined-helper-text'
          defaultValue={emergencyRelation}
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
