import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoggedUser } from '../../../model/Model';
import axios from 'axios';
import {
  BASE_URL,
  LOGIN,
  PAST_APPOINTMENTS,
  PATIENT_PAST_APPOINTMENTS,
  TIMESLOT,
} from '../../../utils/httpConstants';
import { RootState } from '../../reducers';
import { bearerToken } from '../../../authentication/authHeader';
import PatientAppointments from '../../../pages/patient-appointments/PatientAppointments';

interface LoggedUserState {
  loggedUser: LoggedUser;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const appUser = () => {
  let user: LoggedUser = {
    id: '',
    name: '',
    surname: '',
    initials: '',
    email: '',
    type: '',
    occupation: null,
    patientInfo: null,
    upcomingAppointment: [],
    pastAppointment: [],
  };
  const userString: string | null = localStorage.getItem('loggedUser');
  if (userString !== null) {
    user = JSON.parse(userString);
  }
  return user;
};

const user: LoggedUser = JSON.parse(
  localStorage.getItem('loggedUser') ||
    `{
  id: '',
  name: '',
  surname: '',
  initials: '',
  email: '',
  type: '',
  occupation: null,
  patientInfo: null,
  upcomingAppointment: [],
  pastAppointment: [],
}`,
);

const loggedUserState: LoggedUserState = {
  loggedUser: user,
  status: 'idle',
  error: null,
};

export const userLogin = createAsyncThunk(
  'loggedUser/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios
      .post(BASE_URL.concat(LOGIN), payload)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        return response;
      });
    return response.data;
  },
);

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: loggedUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loggedUser = action.payload.loggedUser;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem(
          'loggedUser',
          JSON.stringify(action.payload.loggedUser),
        );
        // state.loggedUser.pastAppointment = [...state.loggedUser.pastAppointment, ...action.payload];
        state.status = 'succeeded';
      })
      .addCase(userLogin.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message ?? 'Login failed';
        state.status = 'failed';
      });
  },
});

export const selectLoggedUser = (state: RootState) =>
  state.loggedUser.loggedUser;
export const initials = (state: RootState) =>
  state.loggedUser.loggedUser.initials;
export const selectLoggedUserType = (state: RootState) =>
  state.loggedUser.loggedUser.type;
export const selectUpcomingAppointments = (state: RootState) =>
  state.loggedUser.loggedUser.upcomingAppointment;
export const selectPastAppointments = (state: RootState) =>
  state.loggedUser.loggedUser.pastAppointment;
export const selectPatientInfo = (state: RootState) =>
  state.loggedUser.loggedUser.patientInfo;

export const selectIsLogged = () => localStorage.getItem('token') !== null;
export const selectIsUserLoaded = (state: RootState) =>
  !!state.loggedUser.loggedUser.id;
export default loggedUserSlice.reducer;
