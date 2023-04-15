import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { userSlice } from './slices/user/userSlice';
import { physiciansSlice } from './slices/physician/physicianSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  physicians: physiciansSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
