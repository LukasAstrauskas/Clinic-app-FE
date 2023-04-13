import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import AddingAdminModal from './components/modals/AddAdminModal';
import { Physicians } from './pages/users/Physicians';
import PhysicianModalContent from './components/modals/AddPhysicianModal';
import UserTabs from './pages/users/Tabs';
import Header from './components/header/Header';
import WelcomePage from './pages/welcome/WelcomePage';
import Footer from './components/footer/Footer';
import AddPhysicianModal from './components/modals/AddPhysicianModal';
import EditUserModal from './components/modals/EditUserModal';
import AddAdminModal from './components/modals/AddAdminModal';

function App() {
  return (
    <Container maxWidth='lg' className='container'>
      <Header />
      {/* <EditUserModal /> */}
      <EditUserModal />
      {/* <WelcomePage type={''} /> */}
      <Footer />
    </Container>
    // <Admins />
    // <AddingAdminModal />
    // <>
    // <PhysicianModalContent/>
    // </>
    // <>
    //   <UserTabs />
    // </>
  );
}
export default App;
