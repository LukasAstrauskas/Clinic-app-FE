import { createContext } from 'react';
import { AppointmentState } from '../model/Model';

const AppointmentContext = createContext<AppointmentState>({
  appointment: { physicianId: '', date: '', time: '', patientId: '' },
  setAppointment: () => undefined,
});

export default AppointmentContext;
