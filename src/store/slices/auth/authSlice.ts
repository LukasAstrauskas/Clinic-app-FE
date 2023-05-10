import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import { RootState } from '../../types';
import { authFetchUserById, login, logout } from './authActions';

const initialState: AuthState = {
  type: null,
  id: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  user: null,
};

export interface AuthState {
  type: string | null;
  id: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  user: User | null;
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
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(authFetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authFetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(authFetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch user';
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectType = (state: RootState) => state.auth.type;
export const selectId = (state: RootState) => state.auth.id;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectisLoggedIn = (state: RootState) => state.auth.isLoggedIn;
