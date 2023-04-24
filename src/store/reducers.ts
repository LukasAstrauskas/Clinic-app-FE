import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { patientSlice } from './slices/patient/patientSlice';
import { adminSlice } from './slices/admin/adminSlice';
import { physicianSlice } from './slices/physician/physicianSlice';
import { phyNameOccupationSlice } from './slices/physician/phyNameOccupationSlice';
import { userSlice } from './slices/user/userSlice';
import { occupationSlice } from './slices/occupations/occupationsSlice';
import { physicianDtoSlice } from './slices/physician/physicianDtoSlice';

export const resetStore = () => ({ type: 'RESET_STORE' });

const appReducer = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  patient: patientSlice.reducer,
  physician: physicianSlice.reducer,
  admin: adminSlice.reducer,
  phyNameOccupation: phyNameOccupationSlice.reducer,
  occupation: occupationSlice.reducer,
  physicianDto: physicianDtoSlice.reducer,
});

const rootReducer: Reducer<
  ReturnType<typeof appReducer>,
  ReturnType<typeof resetStore>
> = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
