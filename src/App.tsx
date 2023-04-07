import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import Main from './components/main/Main';
import Header from './components/header/Header';
import WelcomePage from './pages/welcome/WelcomePage';
import AddNewPhysicianModal from './components/modals/AddNewPhysicianModal';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Container maxWidth='lg'>
      <Header />
      <WelcomePage />
      <AddNewPhysicianModal />
      <Footer />
    </Container>
  );
}
export default App;
