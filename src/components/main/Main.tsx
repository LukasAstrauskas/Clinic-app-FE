import React from 'react';
import WelcomePage from '../../pages/welcome/WelcomePage';
import '../../App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/login/Login';
import { ROUTES } from '../../routes/routes';
import { Patients } from '../../pages/patients/Patients';
import NotFound from '../../pages/notFound/NotFound';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.PATIENTS} element={<Patients />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Main;
