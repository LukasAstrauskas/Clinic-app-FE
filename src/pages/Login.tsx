import LockIcon from '@mui/icons-material/Lock';
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import React from 'react';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.login}>
      <Container maxWidth='xs'>
        <div className={styles.centerItems}>
          <LockIcon fontSize='large' />
          <h2>Sign in</h2>
        </div>
        <TextField
          label='Email'
          placeholder='Enter email'
          fullWidth
          margin='normal'
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          fullWidth
          type='password'
        />
        <div className={styles.buttonContainer}>
          <Button variant='contained' href='WelcomePage' size='large'>
            SIGN IN
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Login;
