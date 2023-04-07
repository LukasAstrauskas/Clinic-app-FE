import LockIcon from '@mui/icons-material/Lock';
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import React, { useState } from 'react';
import styles from './Login.module.css';
import { isValidEmail } from '../../components/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

const Login = () => {
  const [errorAlertOpen, setSignInError] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // Handle Sign in logic
    // If there's an error, set signInError to true
    // Function "navigate()" should be placed inside if statement to check if the user signed in successfully
    navigate(ROUTES.HOME);
    setSignInError(true);
  };
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

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
          error={!(isValidEmail(email) || email.length === 0)}
          helperText={
            !(isValidEmail(email) || email.length === 0) ? 'Invalid email' : ''
          }
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          fullWidth
          type='password'
        />
        <div className={styles.buttonContainer}>
          <Button variant='contained' onClick={handleSignInClick} size='large'>
            SIGN IN
          </Button>
        </div>
        {errorAlertOpen && (
          <Alert severity='error' onClose={() => setSignInError(false)}>
            {/* Change text later */}
            Sign In button is not implemented yet
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Login;
