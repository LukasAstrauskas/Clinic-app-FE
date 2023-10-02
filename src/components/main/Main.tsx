import React from 'react';
import HomePage from '../../pages/home/HomePage';
import '../../App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/login/Login';
import { ROUTES } from '../../routes/routes';
import NotFound from '../../pages/notFound/NotFound';
import ManageUsers from '../../pages/manage-users/ManageUsers';
import TimetablesContainer from '../../pages/book-appointment/TimetablesContainer';
import BookAppointment from '../../pages/book-appointment/BookAppointment';
import PrivateRoutes from '../../routes/PrivateRoutes';
import PatientProfile from '../../pages/patient-profile/PatientProfile';
import PatientAppointments from '../../pages/patient-appointments/PatientAppointments';
import { Box } from '@mui/material';
import ManageTimeslots from '../../pages/manage-timeslots/ManageTimeslots';

const Main = () => {
  return (
    <Box
      sx={{
        border: '1px solid #e3f2fd',
        bgcolor: '#e3f2fd',
        minHeight: '37rem',
      }}
    >
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path={ROUTES.HOMEPAGE} element={<HomePage />} />
          <Route path={ROUTES.MANAGEUSERS} element={<ManageUsers />} />
          <Route path={ROUTES.MANAGETIMESLOTS} element={<ManageTimeslots />} />
          <Route path={ROUTES.BOOKAPPOINTMENT} element={<BookAppointment />} />
          <Route
            path={ROUTES.PATIENTAPPOINTMENTS}
            element={<PatientAppointments />}
          />
          <Route path={ROUTES.PATIENTPROFILE} element={<PatientProfile />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default Main;
