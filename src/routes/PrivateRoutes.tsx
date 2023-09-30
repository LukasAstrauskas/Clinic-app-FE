import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routes';

const PrivateRoutes = () => {
  const isLoggedIn = sessionStorage.getItem('isLogged') || '';

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
