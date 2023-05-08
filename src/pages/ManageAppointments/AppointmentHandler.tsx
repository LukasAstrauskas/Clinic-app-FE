import { type } from 'os';
import React from 'react';
import AppointmentTabs from '../patient/AppointmentTabs';
import BookAppointment from '../admin/BookAppointment';

const AppointmentHandler = () => {
  const userType = sessionStorage.getItem('type');

  if (userType === 'patient') {
    return <AppointmentTabs />;
  } else {
    return <BookAppointment />;
  }
};

export default AppointmentHandler;
