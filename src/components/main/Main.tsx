import React from 'react';
import WelcomePage from '../../pages/welcome/WelcomePage';
import '../../App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/login/Login';
import { ROUTES } from '../../routes/routes';
import NotFound from '../../pages/notFound/NotFound';
import UserTabs from '../../pages/users/Tabs';
import TimetablesContainer from '../../pages/timetables/TimetablesContainer';
import BookAppointment from '../../pages/admin/BookAppointment';
import PrivateRoutes from '../../routes/PrivateRoutes';
import PatientContactInfo from '../../pages/users/PatientContactInfo';
import AppointmentTabs from '../../pages/patient/AppointmentTabs';

const Main = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path='*' element={<NotFound />} />
      <Route element={<PrivateRoutes />}>
        <Route path={ROUTES.HOME} element={<WelcomePage />} />
        <Route path={ROUTES.USERS} element={<UserTabs />} />
        <Route path={ROUTES.PATIENTS} element={<UserTabs />} />
        <Route path={ROUTES.TIMETABLE} element={<TimetablesContainer />} />
        <Route path={ROUTES.BOOKAPPOINTMENT} element={<BookAppointment />} />
        <Route path={ROUTES.MANAGEAPPOINTMENTS} element={<AppointmentTabs />} />
        <Route path={ROUTES.PATIENTPROFILE} element={<PatientContactInfo />} />
      </Route>
    </Routes>
  );
};

export default Main;
