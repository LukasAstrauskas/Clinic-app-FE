import React from 'react';
import WelcomePage from './pages/welcome/WelcomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Container from '@mui/material/Container';
import './App.css';
import AddNewPhysicianModal from './components/modals/AddNewPhysicianModal';

function App() {
  return (
    <Container maxWidth='lg'>
      <Header />
      {/* <Login /> */}
      <WelcomePage />
      <AddNewPhysicianModal />
      <Footer />
    </Container>
  );
}
export default App;
