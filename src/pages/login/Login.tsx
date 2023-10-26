import LockIcon from '@mui/icons-material/Lock';
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import Styles from '../../components/styles/UserManagmentStyles';
import { useAppDispatch } from '../../store/hooks';
import { userLogin } from '../../store/slices/loggedUser/loggedUserSlice';

const Login = () => {
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dipatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dipatch(userLogin({ email, password }));
    if (localStorage.getItem('token') !== null) {
      navigate(ROUTES.HOMEPAGE);
    } else {
      setErrorAlertOpen(true);
    }
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
              value={email}
              // autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label='Password'
              placeholder='Enter password'
              fullWidth
              type='password'
              value={password}
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorAlertOpen && (
              <Alert
                severity='error'
                sx={{ marginTop: 1 }}
                onClose={() => setErrorAlertOpen(false)}
              >
                Wrong email or password.
              </Alert>
            )}
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
      </Container>
    </div>
  );
};

export default Login;
