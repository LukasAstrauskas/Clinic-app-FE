import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import Tabs from './pages/users/Tabs';

function App() {
  return (
    <Container className='container'>
      <Tabs />
      {/* <   <Header />
      <Main />
      <Footer />> */}
    </Container>
  );
}
export default App;
