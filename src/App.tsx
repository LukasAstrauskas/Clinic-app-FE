import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';

function App() {
  return (
    <Container maxWidth='lg'>
      <Header />
      <Main />
      <Footer />
    </Container>
  );
}
export default App;
