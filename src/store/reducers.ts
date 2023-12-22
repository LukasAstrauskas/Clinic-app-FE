import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';
import { patientSlice } from './slices/patient/patientSlice';
import { userSlice } from './slices/manage-users/userSlice';
import { occupationSlice } from './slices/occupation/occupationSlice';
import { timeslotSlice } from './slices/timeslot/timeslotSlice';
import loggedUserReducer from './slices/loggedUser/loggedUserSlice';
import { appointmentSlice } from './slices/appointment/appointmentSlice';
import { patientsSlice } from './slices/users/patientsSlice';
import { physiciansSlice } from './slices/users/physiciansSlice';
import { adminsSlice } from './slices/users/adminsSlice';

export const resetStore = () => ({ type: 'RESET_STORE' });

const appReducer = combineReducers({
  user: userSlice.reducer,
  patient: patientSlice.reducer,
  occupation: occupationSlice.reducer,
  timeslot: timeslotSlice.reducer,
  loggedUser: loggedUserReducer,
  appointment: appointmentSlice.reducer,
  patients: patientsSlice.reducer,
  physicians: physiciansSlice.reducer,
  admins: adminsSlice.reducer,
});

export const rootReducer: Reducer<
  ReturnType<typeof appReducer>,
  ReturnType<typeof resetStore>
> = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
