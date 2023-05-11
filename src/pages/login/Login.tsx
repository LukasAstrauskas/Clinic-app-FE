import LockIcon from '@mui/icons-material/Lock';
import { TextField, styled } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import React, { useState } from 'react';
import styles from './Login.module.css';
import { isValidEmail } from '../../components/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';
import { login } from '../../store/slices/auth/authActions';
import { fetchPatientInfo } from '../../store/slices/patient/patientSlice';
import Styles from '../../components/styles/UserManagmentStyles';

const Login = () => {
  const [errorAlertOpen, setSignInError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await dispatch(login({ email, password }));
      const userId = sessionStorage.getItem('userId');
      if (response.payload && response.payload.type) {
        navigate(ROUTES.HOME);
        if (sessionStorage.getItem('type') === 'patient' && userId !== null) {
          await dispatch(fetchPatientInfo(userId));
        }
      }
    } catch (error) {
      setSignInError(true);
    }
  };

  const handleEmailCheck = () =>
    setEmailError(!isValidEmail(email) ? 'Email is invalid' : '');

  return (
    <div className={styles.login}>
      <Container maxWidth='xs'>
        <form onSubmit={handleSubmit}>
          <>
            <div className={styles.centerItems}>
              <LockIcon fontSize='large' />
              <h2>Sign in</h2>
            </div>
            <TextField
              label='Email'
              placeholder='Enter email'
              fullWidth
              margin='normal'
              helperText={emailError === '' ? '' : emailError}
              error={emailError !== ''}
              onBlur={handleEmailCheck}
              value={email || null}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label='Password'
              placeholder='Enter password'
              fullWidth
              type='password'
              value={password || null}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.buttonContainer}>
              <Button
                variant='contained'
                type='submit'
                size='large'
                sx={Styles.loginButton}
              >
                SIGN IN
              </Button>
            </div>
          </>
        </form>
        {errorAlertOpen && (
          <Alert severity='error' onClose={() => setSignInError(false)}>
            Wrong email or password.
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Login;
