import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';
import { patientSlice } from './slices/patient/patientSlice';
import { adminSlice } from './slices/admin/adminSlice';
import { physicianSlice } from './slices/physician/physicianSlice';
import { userSlice } from './slices/manage-users/userSlice';
import { userSizeSlice } from './slices/userSize/userSizeSlice';
import { occupationSlice } from './slices/occupation/occupationSlice';
import { timeslotSlice } from './slices/timeslot/timeslotSlice';
import loggedUserReducer from './slices/loggedUser/loggedUserSlice';
import { appointmentSlice } from './slices/appointment/appointmentSlice';
import { patientsSlice } from './slices/users/patientsSlice';
// import appointmentReducer from './slices/appointment/appointmentSlice';
// import loggedUserSlice from './slices/loggedUser/loggedUserSlice';

export const resetStore = () => ({ type: 'RESET_STORE' });

const appReducer = combineReducers({
  size: userSizeSlice.reducer,
  user: userSlice.reducer,
  patient: patientSlice.reducer,
  physician: physicianSlice.reducer,
  admin: adminSlice.reducer,
  occupation: occupationSlice.reducer,
  // physicianDto: editedPhysicianSlice.reducer,
  timeslot: timeslotSlice.reducer,
  loggedUser: loggedUserReducer,
  // appointment: appointmentReducer,
  appointment: appointmentSlice.reducer,
  patients: patientsSlice.reducer,
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
