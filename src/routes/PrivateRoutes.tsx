import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ redirectPath = '/login' }) => {
  const isLoggedIn = sessionStorage.getItem('isLogged') || '';

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

PrivateRoutes.propTypes = {
  redirectPath: PropTypes.string,
};
export default PrivateRoutes;
