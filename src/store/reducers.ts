import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { userSlice } from '../features/user/userSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
