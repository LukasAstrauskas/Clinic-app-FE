import React from 'react';
import WelcomePage from './pages/welcome/WelcomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Container from '@mui/material/Container';
import './App.css';

function App() {
  return (
    <Container maxWidth='lg'>
      <Header />
      {/* <Login /> */}
      <WelcomePage />
      <Footer />
    </Container>
  );
}

export default App;
