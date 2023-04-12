import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import AddingAdminModal from './components/modals/AddAdminModal';
import { Physicians } from './pages/users/Physicians';
import PhysicianModalContent from './components/modals/AddPhysicianModal';
import UserTabs from './pages/users/Tabs';

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
      <UserTabs />
    </>
  );
}
export default App;
