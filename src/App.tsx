import React from 'react';
import WelcomePage from './pages/welcome/WelcomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Container from '@mui/material/Container';
import './App.css';
import AddingAdminModal from './components/modals/AddAdminModal';
import { Physicians } from './pages/physicians/Physicians';
import PhysicianModalContent from './components/modals/AddPhysicianModal';
import Tabs from './components/tabs/Tabs';

function App() {
  return (
    // <Container maxWidth='lg'>
    //   <Header />
    //   <WelcomePage />
    //   <AddNewPhysicianModal />
    //   <Footer />
    // </Container>
    // <Admins />
    // <AddingAdminModal />
    // <>
    // <PhysicianModalContent/>
    // </>
    <>
      <Tabs />
    </>
  );
}

export default App;
