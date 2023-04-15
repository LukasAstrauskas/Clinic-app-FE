import React, { useState } from 'react';
import WelcomePage from '../../pages/welcome/WelcomePage';
import '../../App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/login/Login';
import { ROUTES } from '../../routes/routes';
import { Patients } from '../../pages/users/Patients';
import NotFound from '../../pages/notFound/NotFound';
import UserTabs from '../../pages/users/Tabs';

const Main = () => {
  // isLogged should maybe be used for protected routes?
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLogged, setIsLogged] = useState(false);
  const [type, setType] = useState('');

  return (
    <Routes>
      <Route path='/' element={<WelcomePage type={type} />} />
      <Route path={ROUTES.USERS} element={<UserTabs />} />
      <Route
        path={ROUTES.LOGIN}
        element={<Login setIsLogged={setIsLogged} setType={setType} />}
      />
      <Route path={ROUTES.PATIENTS} element={<Patients />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Main;
