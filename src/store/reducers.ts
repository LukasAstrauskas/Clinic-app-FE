import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { patientSlice } from './slices/patient/patientSlice';
import { adminSlice } from './slices/admin/adminSlice';
import { physicianSlice } from './slices/physician/physicianSlice';
import { phyNameOccupationSlice } from './slices/physician/phyNameOccupationSlice';
import { userSlice } from './slices/user/userSlice';
import { occupationSlice } from './slices/occupations/occupationsSlice';
import { physicianDtoSlice } from './slices/physician/physicianDtoSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  patient: patientSlice.reducer,
  physician: physicianSlice.reducer,
  admin: adminSlice.reducer,
  phyNameOccupation: phyNameOccupationSlice.reducer,
  occupation: occupationSlice.reducer,
  physicianDto: physicianDtoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
