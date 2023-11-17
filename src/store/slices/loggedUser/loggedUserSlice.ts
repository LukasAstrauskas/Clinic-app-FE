import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  PatientAppointment,
  LoggedUser,
  PatientInfo,
} from '../../../model/Model';
import axios from 'axios';
import {
  BASE_URL,
  LOGIN,
  PAST_APPOINTMENTS,
  PATIENT_INFO,
  TIMESLOT,
} from '../../../utils/httpConstants';
import { RootState } from '../../reducers';
import { bearerToken } from '../../../authentication/authHeader';
import { Status } from '../../../utils/Status';
import { PATIENT } from '../../../utils/Users';
import { bookTimeslot, cancelAppointment } from '../timeslot/timeslotActions';

interface LoggedUserState {
  loggedUser: LoggedUser;
  status: Status.IDLE | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const userString = JSON.stringify({
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
});

const user: LoggedUser = JSON.parse(
  localStorage.getItem('loggedUser') || userString,
);

const loggedUserState: LoggedUserState = {
  loggedUser: user,
  status: Status.IDLE,
  error: null,
};

export const userLogin = createAsyncThunk(
  'loggedUser/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios.post(BASE_URL.concat(LOGIN), payload);
    return response;
  },
);

export const updatePatientInfo = createAsyncThunk(
  'patientInfo/updatePatientInfo',
  async (updatedPatientInfo: PatientInfo) => {
    const response = await axios.put(
      BASE_URL.concat(PATIENT_INFO),
      updatedPatientInfo,
      {
        headers: bearerToken(),
      },
    );
    return response.data;
  },
);

export const fetchPatientPastAppointments = createAsyncThunk(
  'appointment/past-appointments',
  async (offset: number) => {
    const response = await axios.get(
      BASE_URL.concat(TIMESLOT).concat(PAST_APPOINTMENTS).concat(`/${offset}`),
      {
        headers: bearerToken(),
      },
    );
    return response.data;
  },
);

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: loggedUserState,
  reducers: {
    logout(state) {
      localStorage.removeItem('loggedUser');
      localStorage.removeItem('token');
      localStorage.removeItem('patients');
      state.loggedUser = user;
    },
    addAppointment(state, action: PayloadAction<PatientAppointment>) {
      console.log(`Appoinment: ${action.payload}.`);
      state.loggedUser.upcomingAppointment = [
        ...state.loggedUser.upcomingAppointment,
        action.payload,
      ];
      localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        const loginDTO = action.payload.data;
        state.loggedUser = loginDTO.loggedUser;
        localStorage.setItem('token', JSON.stringify(loginDTO.token));
        localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser));
        state.status = 'succeeded';
      })
      .addCase(userLogin.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message ?? 'Login failed';
        state.status = 'failed';
      })
      .addCase(fetchPatientPastAppointments.fulfilled, (state, action) => {
        state.loggedUser.pastAppointment = [
          ...state.loggedUser.pastAppointment,
          ...action.payload,
        ];
        localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser));
        state.status = 'succeeded';
      })
      .addCase(fetchPatientPastAppointments.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPatientPastAppointments.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to load data';
        state.status = 'failed';
      })
      .addCase(updatePatientInfo.fulfilled, (state, action) => {
        state.loggedUser.patientInfo = action.payload;
        localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser));
        state.status = 'succeeded';
      })
      .addCase(updatePatientInfo.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updatePatientInfo.rejected, (state, action) => {
        state.error = action.error.message ?? 'user info not updated.';
        state.status = 'failed';
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const deletedId: string = action.payload;

        const filteredAppointments =
          state.loggedUser.upcomingAppointment.filter(
            (appointment) => appointment.id !== deletedId,
          );
        state.loggedUser.upcomingAppointment = filteredAppointments;
        localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser));
        state.status = 'succeeded';
      })
      .addCase(cancelAppointment.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed cancel appointment.';
        state.status = 'failed';
      })
      .addCase(bookTimeslot.fulfilled, (state, action) => {
        if (state.loggedUser.type === PATIENT) {
          state.loggedUser.upcomingAppointment = action.payload.data;
          localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser));
        }
        state.status = Status.IDLE;
      });
  },
});

export const selectLoggedUser = (state: RootState) =>
  state.loggedUser.loggedUser;
export const selectLoggedUserId = (state: RootState) =>
  state.loggedUser.loggedUser.id;
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

export const { logout, addAppointment } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
