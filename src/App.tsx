import React, { useState } from 'react';
import WelcomePage from './pages/welcome/WelcomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Container from '@mui/material/Container';
import './App.css';
import Login from './pages/login/Login';

function App() {
  //Reminder to change isLogged, type with redux variant.
  const [isLogged, setIsLogged] = useState(false);
  const [type, setType] = useState('');

  return (
    <Container maxWidth='lg'>
      <Header />
      {!isLogged ? (
        <Login setIsLogged={setIsLogged} setType={setType} />
      ) : (
        <WelcomePage type={type} />
      )}
      <Footer />
    </Container>
  );
}

export default App;
