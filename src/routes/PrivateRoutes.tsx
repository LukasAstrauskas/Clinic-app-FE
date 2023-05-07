import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const isLoggedIn = sessionStorage.getItem('isLogged') || '';

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
