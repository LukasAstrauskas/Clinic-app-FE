import { Button } from '@mui/material';
import * as React from 'react';
import RenderAddNewPhysicianModal from './RenderAddNewPhysicianModal';
import { useRef, useState } from 'react';
import {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidPassword,
} from '../../utils';

// change to data from backend.
const Occupations = [
  {
    value: '1',
    label: 'Dentist',
  },
  {
    value: '2',
    label: 'GP',
  },
  {
    value: '3',
    label: 'Otolaryngologist',
  },
  {
    value: '4',
    label: 'Neurologist',
  },
];
type Physician = {
  fullName: string;
  email: string;
  password: string;
  occupation: string;
};

export default function AddNewPhysicianModal() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const occupationInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setShowPassword(false);
    setOpen(true);
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setEmail('');
  };
  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const occupationInput = occupationInputRef.current?.value || '';
    const fullName = `${firstName} ${lastName}`;
    const newPhysician = {
      fullName,
      email,
      password,
      occupation: occupationInput,
    };

    if (
      firstNameError === '' &&
      lastNameError === '' &&
      emailError === '' &&
      passwordError === ''
    ) {
      setPhysicians([...physicians, newPhysician]);
      handleClose();
    }
  };

  const handleFirstNameCheck = () => {
    if (!isValidFirstName(firstName)) {
      setFirstNameError('First name cannot be empty');
    } else {
      setFirstNameError('');
    }
  };
  const handleLastNameCheck = () => {
    if (!isValidLastName(lastName)) {
      setLastNameError('Last name cannot be empty');
    } else {
      setLastNameError('');
    }
  };
  const handleEmailCheck = () => {
    if (!isValidEmail(email)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };
  const handlePasswordCheck = () => {
    if (isValidPassword(password)) {
      setPasswordError('');
    } else {
      setPasswordError(
        'Password requires 1 letter, 1 number, and be 8+ characters.',
      );
    }
  };

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #D3D3D3',
    borderRadius: '20px',
    boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.3)',
    p: 4,
    '& .physiciansModalForm': {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
  };
  const textFieldStyle = {
    width: '46%',
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
    '& .css-14lo706': {
      width: '0px',
    },
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>
        Manage Physicians
      </Button>
      <RenderAddNewPhysicianModal
        open={open}
        handleClose={handleClose}
        setFirstName={setFirstName}
        firstNameError={firstNameError}
        setLastName={setLastName}
        lastNameError={lastNameError}
        setEmail={setEmail}
        emailError={emailError}
        setPassword={setPassword}
        passwordError={passwordError}
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleSubmit={handleSubmit}
        handleFirstNameCheck={handleFirstNameCheck}
        handleLastNameCheck={handleLastNameCheck}
        handleEmailCheck={handleEmailCheck}
        handlePasswordCheck={handlePasswordCheck}
        occupations={Occupations}
        modalStyle={modalStyle}
        textFieldStyle={textFieldStyle}
        {...handleOpen}
      />
    </div>
  );
}
