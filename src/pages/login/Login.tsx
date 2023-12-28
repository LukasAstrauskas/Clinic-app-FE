import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { Stack, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loginError,
  userLogin,
} from '../../store/slices/loggedUser/loggedUserSlice';
import { LIGHTGREEN, MAINGREEN } from '../../utils/Constants';

const Login = () => {
  const [openAlert, switchOpenAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dipatch = useAppDispatch();
  const errorMessage = useAppSelector(loginError);

  const signIn = () => {
    dipatch(userLogin({ email, password }))
      .unwrap()
      .then(() => {
        switchOpenAlert(false);
        navigate(ROUTES.HOMEPAGE);
      })
      .catch(() => {
        switchOpenAlert(true);
      });
  };

  return (
    <>
      <Container maxWidth='xs' sx={{ marginTop: 20 }}>
        <Stack alignItems='center' justifyContent='center' spacing={3}>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={2}
          >
            <LockIcon fontSize='large' />
            <strong>Sign in</strong>
          </Stack>
          <TextField
            label='Email'
            placeholder='Enter email'
            fullWidth
            type='email'
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
          {openAlert && (
            <Alert
              severity='error'
              sx={{ marginTop: 1 }}
              onClose={() => switchOpenAlert(false)}
            >
              Wrong email or password.
              {errorMessage}
            </Alert>
          )}
          <Button
            variant='contained'
            size='large'
            disabled={email === '' && password === ''}
            sx={{
              bgcolor: MAINGREEN,
              '&:hover': {
                bgcolor: LIGHTGREEN,
              },
            }}
            onClick={signIn}
          >
            SIGN IN
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
