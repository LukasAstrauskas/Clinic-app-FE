import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { patientSlice } from './slices/patient/patientSlice';
import { adminSlice } from './slices/admin/adminSlice';
import { physicianSlice } from './slices/physician/physicianSlice';
import { phyNameOccupationSlice } from './slices/physician/phyNameOccupationSlice';
import { userSlice } from './slices/user/userSlice';
import { userSizeSlice } from './slices/userSize/userSizeSlice';

const rootReducer = combineReducers({
  size: userSizeSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  patient: patientSlice.reducer,
  physician: physicianSlice.reducer,
  admin: adminSlice.reducer,
  phyNameOccupation: phyNameOccupationSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
