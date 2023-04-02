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
  setRole: (value: string) => void;
};

const Login = ({ setIsLogged, setRole }: LoginProps) => {
  const [errorAlertOpen, setSignInError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post('http://localhost:8080/login', { email, password })
      .then((response) => {
        if (response.data) {
          const id = response.data;
          setIsLogged(true);
          axios
            .get(`http://localhost:8080/user/${id}`)
            .then((response) => {
              const { type } = response.data;
              setRole(type);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setSignInError(true);
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
              error={!(isValidEmail(email) || email.length === 0)}
              helperText={
                !(isValidEmail(email) || email.length === 0)
                  ? 'Invalid email'
                  : ''
              }
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
