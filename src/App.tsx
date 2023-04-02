import React, { useState } from 'react';
import WelcomePage from './pages/welcome/WelcomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Container from '@mui/material/Container';
import './App.css';
import Login from './pages/login/Login';

function App() {
  //Reminder to change isLogged, role with redux variant.
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState('');

  return (
    <Container maxWidth='lg'>
      <Header />
      {!isLogged ? (
        <Login setIsLogged={setIsLogged} setRole={setRole} />
      ) : (
        <WelcomePage type={role} />
      )}
      <Footer />
    </Container>
  );
}

export default App;
