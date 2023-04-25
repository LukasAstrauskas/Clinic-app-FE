import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectisLoggedIn } from '../store/slices/auth/authSlice';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ redirectPath = '/login' }) => {
  const isLoggedIn = useSelector(selectisLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

PrivateRoutes.propTypes = {
  redirectPath: PropTypes.string,
};
export default PrivateRoutes;
