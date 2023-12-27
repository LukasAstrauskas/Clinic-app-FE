import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import BookAppointment from './pages/book-appointment/BookAppointment';
import HomePage from './pages/home/HomePage';
import ManageTimeslots from './pages/manage-timeslots/ManageTimeslots';
import ManageUsers from './pages/manage-users/ManageUsers';
import NotFound from './pages/notFound/NotFound';
import PatientAppointments from './pages/patient-appointments/PatientAppointments';
import PatientProfile from './pages/patient-profile/PatientProfile';
import PrivateRoutes from './routes/PrivateRoutes';
import { ROUTES } from './routes/routes';

function App() {
  return (
    <Container maxWidth='lg'>
      <Header />
      <Box
        sx={{
          border: '1px solid #e3f2fd',
          bgcolor: '#e3f2fd',
          minHeight: '35.5rem',
        }}
      >
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route element={<PrivateRoutes />}>
            <Route path={ROUTES.HOMEPAGE} element={<HomePage />} />
            <Route path={ROUTES.MANAGEUSERS} element={<ManageUsers />} />
            <Route
              path={ROUTES.MANAGETIMESLOTS}
              element={<ManageTimeslots />}
            />
            <Route
              path={ROUTES.BOOKAPPOINTMENT}
              element={<BookAppointment />}
            />
            <Route
              path={ROUTES.PATIENTAPPOINTMENTS}
              element={<PatientAppointments />}
            />
            <Route path={ROUTES.PATIENTPROFILE} element={<PatientProfile />} />
          </Route>
        </Routes>
      </Box>
      <Footer />
    </Container>
  );
}
export default App;
