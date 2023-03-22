import React from 'react';
import WelcomePage from './pages/welcome/WelcomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Container from '@mui/material/Container';
import './App.css';

function App() {
  return (
    <Container maxWidth='lg'>
      <Header />
      <WelcomePage />
      <Footer />
    </Container>
  );
}

export default App;
