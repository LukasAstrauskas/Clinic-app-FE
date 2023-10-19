import { createSlice } from '@reduxjs/toolkit';
import { LoggedUser, User } from '../../../model/Model';
import { authFetchUserById, login, logout } from './authActions';
import { RootState } from '../../reducers';

const initialState: AuthState = {
  loggedUser: null,
  type: null,
  id: null,
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

export interface AuthState {
  loggedUser: LoggedUser | null;
  type: string | null;
  id: string | null;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
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
        state.loggedUser = action.payload.loggedUser;
        state.isLoggedIn = true;
        console.log(state.loggedUser);
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

export const selectLoggedUser = (state: RootState) => state.auth.loggedUser;
export const selectLoggedUserType = (state: RootState) =>
  state.auth.loggedUser?.type || '';
export const selectPastAppointments = (state: RootState) =>
  state.auth.loggedUser?.pastAppointment || [];
export const selectPatientInfo = (state: RootState) =>
  state.auth.loggedUser?.patientInfo || null;

export const selectUser = (state: RootState) => state.auth.user;
export const selectInitials = (state: RootState): string | null => {
  const user = state.auth.user;
  const sessionName = sessionStorage.getItem('name');
  let name: string | null = null;
  if (user) {
    name = user.name;
  } else if (sessionName) {
    name = sessionName;
  }
  const setInitials = (fullName: string | null): string | null => {
    if (fullName) {
      const nameArr = fullName.split(' ');
      if (nameArr.length === 2) {
        return nameArr[0].charAt(0) + nameArr[1].charAt(0);
      }
      return fullName.substring(0, 2);
    }
    return null;
  };

  return setInitials(name);
};
export const selectType = (state: RootState) => state.auth.type;
export const selectId = (state: RootState) => state.auth.id;
export const selectisLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const authLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
