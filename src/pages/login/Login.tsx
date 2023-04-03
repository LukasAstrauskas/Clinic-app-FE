import LockIcon from '@mui/icons-material/Lock';
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';

import React, { useState } from 'react';
import styles from './Login.module.css';
import { isValidEmail } from '../../components/utils';

type LoginProps = {
  setIsLogged: (value: boolean) => void;
  setType: (value: string) => void;
};

const Login = ({ setIsLogged, setType }: LoginProps) => {
  const [errorAlertOpen, setSignInError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailCheck = () =>
    setEmailError(!isValidEmail(email) ? 'Email is invalid' : '');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post('http://localhost:8080/login', { email, password })
      .then((response) => {
        if (response.data) {
          const { type } = response.data;
          setType(type);
          setIsLogged(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setSignInError(true);
      });
  };
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
              helperText={emailError === '' ? 'Email' : emailError}
              error={emailError !== ''}
              onBlur={handleEmailCheck}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label='Password'
              placeholder='Enter password'
              fullWidth
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.buttonContainer}>
              <Button variant='contained' type='submit' size='large'>
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
