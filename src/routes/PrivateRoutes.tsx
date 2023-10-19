import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routes';
import { useAppSelector } from '../store/hooks';
import {
  selectIsLogged,
  selectLoggedUser,
} from '../store/slices/loggedUser/loggedUserSlice';

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLogged);

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
