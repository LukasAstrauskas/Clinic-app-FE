import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PatientAppointment } from '../../../model/Model';
import axios from 'axios';
import { bearer, bearerToken } from '../../../authentication/authHeader';
import {
  BASE_URL,
  TIMESLOT,
  PAST_APPOINTMENTS,
  PAST_APPOINTMENTS_AMOUNT,
  PATIENT_CANCEL_APPOINTMENT,
} from '../../../utils/httpConstants';
import { RootState } from '../../reducers';

interface AppointmentState {
  upcomingAppointments: PatientAppointment[];
  pastAppointments: PatientAppointment[];
  pastAppointmentAmount: number;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppointmentState = {
  upcomingAppointments: [],
  pastAppointments: [],
  pastAppointmentAmount: 0,
  status: 'idle',
  error: null,
};

export const fetchPatientPastAppointmentAmount = createAsyncThunk(
  'appointment/past-appointments-amount',
  async () => {
    const response = await axios.get(
      BASE_URL.concat(TIMESLOT).concat(PAST_APPOINTMENTS_AMOUNT),
      { headers: bearerToken() },
    );
    return response.data;
  },
);

export const appointmentSlice = createSlice({
  name: 'appoinment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientPastAppointmentAmount.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchPatientPastAppointmentAmount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pastAppointmentAmount = action.payload;
      })
      .addCase(fetchPatientPastAppointmentAmount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load data';
      });
  },
});

export const selectAppointments = (state: RootState) => state.appointment;
export const selectPastAppointmentsAmount = (state: RootState) =>
  state.appointment.pastAppointmentAmount;

// export default appointmentSlice.reducer;
