import Container from '@mui/material/Container';
import React from 'react';
import Header from './header/Header';
import Main from './content/Content';
import Footer from './footer/Footer';

const WelcomePage = () => {
  return (
    <Container maxWidth='lg'>
      <Header />
      <Main />
      <Footer />
    </Container>
  );
};

export default WelcomePage;
