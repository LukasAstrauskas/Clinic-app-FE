import React from 'react';
import { Alert, AlertTitle, Container, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Container sx={{ padding: '15%' }}>
      <Alert severity='info'>
        <AlertTitle>
          <Typography variant='h4' component='h4'>
            Error 404
          </Typography>
        </AlertTitle>
        <Typography variant='h5' component='h5'>
          <strong>We apologize,</strong> but it seems the page you are looking
          for has taken a sick day.
        </Typography>
      </Alert>
    </Container>
  );
};

export default NotFound;
