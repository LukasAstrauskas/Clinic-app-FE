import { createSlice } from '@reduxjs/toolkit';
import { login } from './authActions';
import { RootState } from '../../types';

const initialState: AuthState = {
  type: null,
  id: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

export interface AuthState {
  type: string | null;
  id: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.type = action.payload.type;
        state.id = action.payload.id;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Login failed.';
      });
  },
});

export const selectType = (state: RootState) => state.auth.type;
export const selectId = (state: RootState) => state.auth.id;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectisLoggedIn = (state: RootState) => state.auth.isLoggedIn;
